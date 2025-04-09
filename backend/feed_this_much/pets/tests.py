from django.contrib.auth.models import User
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from .models import Pet

class PetAPITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass123')
        self.client = APIClient()
        self.client.login(username='testuser', password='testpass123')
        self.pet_data = {
            "name": "Whiskers",
            "species": "Cat",
            "dob": "2020-01-01",
            "weight": 4.5,
            "weight_unit": "kg",
            "neutered": True,
            "activity_level": "moderate-low",
            "condition_score": "ideal"
        }

    def test_save_pet_success(self):
        response = self.client.post('/api/save-pet/', self.pet_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], 'Whiskers')

    def test_get_pets_returns_saved_pet(self):
        self.client.post('/api/save-pet/', self.pet_data, format='json')
        response = self.client.get('/api/get-pets/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Whiskers')

    def test_get_pets_returns_empty_list_if_none(self):
        response = self.client.get('/api/get-pets/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])

    def test_save_pet_requires_authentication(self):
        self.client.logout()
        response = self.client.post('/api/save-pet/', self.pet_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_pets_requires_authentication(self):
        self.client.logout()
        response = self.client.get('/api/get-pets/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

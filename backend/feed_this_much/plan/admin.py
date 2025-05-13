from django.contrib import admin

from .models import UserPlan
from .models import CombinedPlan

admin.site.register(UserPlan)
admin.site.register(CombinedPlan)
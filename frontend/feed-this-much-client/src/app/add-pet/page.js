
import PetForm from "./PetForm"
import ActivityFormDog from "./ActivityFormDog"
import ActivityFormCat from "./ActivityFormCat"

export default function petPage() {
    return <div>
        <h1>Add Pet</h1>
        <PetForm />
        <ActivityFormDog />
        <ActivityFormCat />
    </div>
}
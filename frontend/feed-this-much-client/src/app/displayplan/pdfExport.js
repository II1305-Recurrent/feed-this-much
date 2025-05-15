import { jsPDF } from "jspdf";
import { getRequest, postRequest } from "@/utils/fetchApi";
import { toast } from "sonner";
//import { html2pdf } from "html2pdf.js";

// TODO this can be refactored as a single function 
export async function exportFeedingPlanPdf() {
    const params = new URLSearchParams(window.location.search);
    const selectedId = params.get("id");

    try {
        // Set the plan id from the search params
        let apiPath = "/api/get-combined-plans-byid/" + selectedId + "/";
        const planRes = await getRequest({ path: apiPath });
        const plan = planRes.payload;

        if (!plan) {
            toast.error("No plan data found to export.");
            return;
        }

        //console.log("DEBUG EXPORT SINGLE PLAN OBJECT", plan); // debug

        //This is manualy genearating this text around. Not great, but its a start
        const doc = new jsPDF();
        let y = 10;

        // Main Plan Information
        doc.setFontSize(16);
        doc.text(plan.plan_title, 10, y);
        y += 16; // space for next section

        // First block of text
        doc.setFontSize(12);
        doc.text(
            `${plan.pet_name} needs ${plan.daily_energy_allowance.toFixed(2)} KJ` +
            ` / ${(plan.daily_energy_allowance / 4.184).toFixed(2)} kcal every day.`,
            10,
            y
        );
        y += 8; // space for next section

        // Iterate over sub-plans (foods aka userplan) and add each to the PDF
        plan.plans.forEach((food, idx) => {

            // food name
            doc.setFontSize(14);
            doc.text(`Food ${idx + 1}: ${food.food_name}`, 10, y);
            y += 8;

            // food servings
            doc.setFontSize(12);
            doc.text(
                `Give ${food.daily_servings_amount.toFixed(1)} ${food.food_serving_type}s per day.`,
                10,
                y
            );
            y += 8;

            // food weight
            doc.text(
                `This is ${food.daily_food_weight.toFixed(2)} ${food.daily_food_weight_unit} per day.`,
                10,
                y
            );
            y += 12;
        });

        doc.save("feeding-plan.pdf");

    } catch (err) {
        toast.error("Failed to export PDF");
    }
}

//exports multiple 
export async function exportFeedingPlansPdf() {

    // get all the user's plans
    // api:     path('api/get-combined-plans-all/', get_combined_plans_all, name='get_combined_plans_all'),
    const allPlansRes = await getRequest({ path: "/api/get-combined-plans-all/" }); // get all plans
    const allPlans = Array.isArray(allPlansRes.payload) ? allPlansRes.payload : [];

    if (!Array.isArray(allPlans) || allPlans.length === 0) {
        toast.error("No plan data found to export.");
        return;
    }

    //console.log("DEBUG EXPORT ALL PLAN OBJECT", allPlans); // debug

    const doc = new jsPDF();

    allPlans.forEach((plan, idx) => {

        if (idx > 0) doc.addPage(); // adds new page for each plan

        let y = 10;

        // Main Plan Information
        doc.setFontSize(16);
        doc.text(plan.plan_title, 10, y);
        y += 16; // Space for next section

        doc.setFontSize(12);
        doc.text(
            `${plan.pet_name} needs ${plan.daily_energy_allowance.toFixed(2)} KJ` +
            ` / ${(plan.daily_energy_allowance / 4.184).toFixed(2)} kcal every day.`,
            10,
            y
        );
        y += 8; // Space for next section

        // Iterate over sub-plans (foods aka userplans) and add each to the PDF
        const foods = [];
        if (plan.plan_a_details) foods.push(plan.plan_a_details);
        if (plan.plan_b_details) foods.push(plan.plan_b_details);


        // Add each food to the PDF
        foods.forEach((food, foodIdx) => {
            doc.setFontSize(14);
            doc.text(`Food ${foodIdx + 1}: ${food.food_name}`, 10, y);
            y += 8;

            doc.setFontSize(12);
            doc.text(
                `Give ${food.daily_servings_amount.toFixed(1)} ${food.food_serving_type}s per day.`,
                10,
                y
            );
            y += 8;

            doc.text(
                `This is ${food.daily_food_weight.toFixed(2)} ${food.daily_food_weight_unit} per day.`,
                10,
                y
            );
            y += 12;
        });


    });

    doc.save("feeding-plans.pdf");
}

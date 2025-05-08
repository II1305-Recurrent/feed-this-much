import { jsPDF } from "jspdf";
import { getRequest, postRequest } from "@/utils/fetchApi";
//import { html2pdf } from "html2pdf.js";



/*
Finds a plan id from path, 
*/
export default async function exportFeedingPlanPdf() {
    const params = new URLSearchParams(window.location.search);
    const selectedId = params.get("id");

    try {
        //this is bad way of doing it, but its getting late
        const planRes = await getRequest({ path: "/api/get-plans/" });
        const plans = Array.isArray(planRes.payload) ? planRes.payload : [];
        const plan = plans.find(p => String(p.id) === selectedId);

        if (!plan) {
            alert("No plan data found to export.");
            return;
        }

        //This is manualy genearating this text around. Not great, but its a start
        const doc = new jsPDF();
        let y = 10;

        doc.setFontSize(16);
        doc.text(plan.plan_title, 10, y);

        y += 12;
        doc.setFontSize(12);
        doc.text(
            `${plan.pet_name} needs ${plan.daily_energy_needs.toFixed(2)} KJ` +
            ` / ${(plan.daily_energy_needs / 4.184).toFixed(2)} kcal every day.`,
            10,
            y
        );

        y += 8;
        doc.text(
            `This is ${plan.daily_food_weight.toFixed(2)} ${plan.daily_food_weight_unit}` +
            ` of ${plan.food_name}.`,
            10,
            y
        );

        y += 8;
        doc.text(
            `Give ${plan.pet_name} ${plan.daily_servings_amount.toFixed(1)}` +
            ` ${plan.food_serving_type}s of ${plan.food_name} a day.`,
            10,
            y
        );

        doc.save("feeding-plan.pdf");
    } catch (err) {
        console.error("Export error:", err);
        alert("Failed to export PDF.");
    }
}


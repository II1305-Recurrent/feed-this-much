import { jsPDF } from "jspdf";

/**
 * Generates an empty Feeding Plan PDF and triggers download.
 */
export default function exportFeedingPlanPdf() {
    const doc = new jsPDF();
    doc.save("feeding-plan.pdf");
}


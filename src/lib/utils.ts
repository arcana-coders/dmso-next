export function cleanupText(text: any): string {
    if (text === null || text === undefined) return "";
    
    // Ensure we are working with a string
    const stringText = String(text);
    
    return stringText
        .replace(/Amazon\.com\.mx/gi, "DMSO México")
        .replace(/Amazon\.com/gi, "DMSO México")
        .replace(/Amazon/gi, "DMSO México")
        .replace(/DMSO Store/gi, "DMSO México")
        .replace(/CPAP-México/gi, "DMSO México")
        .replace(/The Respiratory Atelier/gi, "DMSO México")
        .trim();
}

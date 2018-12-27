export function getPassingStats($: CheerioStatic){
    const data = $('#passing th > a');
    $(data).each((index: number, element: CheerioElement) => {
        const header = $(element).text();
        console.log(header);
    });
}
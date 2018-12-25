export function getStats($: CheerioStatic){
    const data = $('div.table_wrapper div.section_heading > h2');
    $(data).each((index: number, element: CheerioElement) => {
        console.log($(element).text());
    });
}
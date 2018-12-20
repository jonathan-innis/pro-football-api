export function getName($: CheerioStatic): string{
    try{
        const data = $('#meta > div > h1');
        return $(data[0]).text();
    }
    catch(error){
        console.log(error);
        return '';
    }
}

export function getPositions($: CheerioStatic): string[]{
    try{
        const data = $('#meta > div > p:nth-child(3)');
        const rawPos = $(data[0]).text().replace(/(\n\t|\n)/gm,"");
        const pos = rawPos.split('Position: ')[1];
        return pos.split('-').filter((element: string) => {return element !== ''});
    }
    catch(error){
        console.log(error);
        return [];
    }
}

export function getHeight($: CheerioStatic): number{
    try{
        const data = $('#meta > div > p:nth-child(4) span:nth-child(1)');
        const rawHeight = $(data[0]).text();
        const feet = parseInt(rawHeight.split('-')[0]);
        const inches = parseInt(rawHeight.split('-')[1]);
        return (feet*12) + inches;
    }
    catch(error){
        console.log(error);
        return 0;
    }
}

export function getWeight($: CheerioStatic): number{
    try{
        const data = $('#meta > div > p:nth-child(4) span:nth-child(2)');
        return parseInt($(data[0]).text().split('lb')[0]);
    }
    catch(error){
        console.log(error);
        return 0;
    }
}

export function getBirthDate($: CheerioStatic): Date{
    try{
        const data = $('#necro-birth');
        const rawDate = $(data[0]).attr('data-birth');
        return new Date(rawDate);
    }
    catch(error){
        console.log(error);
        return new Date();
    }
}

export function getBirthPlace($: CheerioStatic): string{
    try{
        const data = $('#meta > div > p:nth-child(5) > span:nth-child(3)');
        const rawPlace = $(data[0]).text().replace(/(\n\t|\n)/gm,""); //replaces extra tabs and newlines
        const place = rawPlace.split('in')[1].slice(1); //removes the word in and gets rid of extra spaces
        return place;
    }
    catch(error){
        console.log(error);
        return '';
    }
}

export function getCollege($: CheerioStatic): string[] | null{
    try{
        let colleges = null;
        let blockIndex = 1;
        while (!colleges && blockIndex < 10){
            let data = $(`#meta > div > p:nth-child(${blockIndex})`);
            let rawCollege = $(data[0]).text().replace(/(\n\t|\n|\t)/gm,"");
            colleges = rawCollege.split('College: ')[1];
            if (colleges){
                if (colleges.includes('(College Stats)'))
                    colleges = colleges.slice(undefined, colleges.length - 16);
                colleges = colleges.split(',');
                for (let i = 0; i < colleges.length; i++){
                    if (i === 0) colleges[i] = colleges[i].slice(2);
                    else colleges[i] = colleges[i].slice(1);
                }
                if (colleges[0] == 'none') return null;
                return colleges;
            }
            blockIndex++;
        }
        return null;
    }
    catch(error){
        console.log(error);
        return [];
    }
}
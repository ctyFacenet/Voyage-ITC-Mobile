interface VoyageStatus{
    aprroval: number, //đã duyệt
    processing: number, //đang thực hiện
    completed: number, //hoàn thành
}

export const voyageStatus: VoyageStatus = {
    aprroval: 5, //đã duyệt
    processing: 7, //đang thực hiện
    completed: 8, //hoàn thành
}

export const FormatCurrency = (currecny: any) => {
    if(currecny === null || currecny === ''){
        return currecny;
    }
    return currecny.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

export const PrepareCurrency = (revenue: any, expense: any) => {
    if((revenue === null || revenue === undefined) && (expense === null || expense === undefined)){
        return '';
    } else {
        return FormatCurrency((revenue === null || revenue === undefined ? 0 : revenue) -  (expense === null || expense === undefined ? 0 : expense));
    }
}

export const PrepareCurrencyM = (revenue: any, expense: any, milion: any) => {
    if((revenue === null || revenue === undefined) && (expense === null || expense === undefined)){
        return 0;
    } else {
        return (revenue === null || revenue === undefined ? 0 : revenue) -  (expense === null || expense === undefined ? 0 : expense) / milion;
    }
}

export const CalculatePercentage = (value: any, total: any) => {
    if((value === null || total === undefined) || (value === null || total === undefined) || total === 0){
        return 0;
    }
    return ((value / total) * 100).toFixed(2)
}

export const getDate = (date: any)=> {
    if(date === undefined){
        return ''
    } else {
        return new Date(date)
    }
}

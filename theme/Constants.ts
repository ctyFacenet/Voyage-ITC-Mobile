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
        return FormatCurrency((revenue === null || revenue === undefined ? 0 : revenue) -  (expense === null || expense === undefined ? 0 : expense)) + ' USD';
    }
}

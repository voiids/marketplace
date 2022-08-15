export const calcul_single_product_pphORppv = (quantity: number, pphORppv: number) => {
    return quantity * pphORppv;
};

export const calcul_total = (
    products: any,
    result: any,
    quantityName: string,
    pphName: string,
    discountedValueName: string
) => {
    products.forEach((prod: any) => {
        if (result.totalQuantity !== undefined) result.totalQuantity += Number(prod[quantityName]);
        if (result.totalPPH !== undefined)
            result.totalPPH += calcul_single_product_pphORppv(Number(prod.quantity), Number(prod[pphName]));
        if (result.totalPPHDiscounted !== undefined)
            result.totalPPHDiscounted += calcul_single_product_pphORppv(
                Number(prod.quantity),
                Number(prod[discountedValueName])
            );
    });

    return result;
};

export const calcul_totalDiscount = (totalPPH: number, totalPPHDiscounted: number) => {
    return totalPPH - totalPPHDiscounted;
};

export const calcul_discountPercentage = (totalDiscount: number, totalPPH: number) => {
    return (totalDiscount * 100) / totalPPH;
};

export const calcul_add_globalDiscount_to_totalDiscount = (globalDiscountThresholds: any, result: any) => {
    let totalPPHDiscounted = result.totalPPHDiscounted;

    globalDiscountThresholds.forEach((disc: any, indx: number, arr: any) => {
        if (
            (result.totalQuantity < arr[indx + 1]?.minQuantity || indx + 1 >= arr.length) &&
            result.totalQuantity >= disc?.minQuantity
        ) {
            totalPPHDiscounted -= totalPPHDiscounted * (disc?.discountValue / 100);
        }
    });

    return totalPPHDiscounted;
};

export const calcul_allInOne = (
    packs: any,
    globalDiscountThresholds: any,
    quantityName: string,
    pphName: string,
    discountedValueName: string
) => {
    let remise = 0;
    let tEco = 0;
    let res = { totalQuantity: 0, totalPPH: 0, totalPPHDiscounted: 0 };
    packs.forEach((pack: any) => {
        calcul_total(pack?.products, res, quantityName, pphName, discountedValueName);
    });

    res.totalPPHDiscounted = calcul_add_globalDiscount_to_totalDiscount(globalDiscountThresholds, res);

    tEco = calcul_totalDiscount(res.totalPPH, res.totalPPHDiscounted);

    if (res.totalPPH !== 0) remise = calcul_discountPercentage(tEco, res.totalPPH);

    return {
        remise: remise,
        tEco: tEco,
        totalQuantity: res.totalQuantity,
        totalPPH: res.totalPPH,
        totalPPHDiscounted: res.totalPPHDiscounted,
    };
};

import moment from "moment";

export function setDays(i: number) {
    let days = 0
    if (i === 0)
        days = 30
    else if (i === 1)
        days = 60
    else if (i === 2)
        days = 90
    else if (i === 3)
        days = 120
    else if (i === 4)
        days = 150
    let prazo = moment(
        new Date()
    ).add(
        'days', days
    )
    return prazo
}
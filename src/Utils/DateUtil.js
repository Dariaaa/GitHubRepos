export class DateUtil{
    static formatDate = (dateStr) =>{
        let arr = dateStr.split("T")[0].split("-")
        let year = arr[0]
        let month = arr[1]
        let day = arr[2]
        return `${day}.${month}.${year}`
    }

}

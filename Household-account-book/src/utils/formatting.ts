import { format } from "date-fns";
//日付をformatに適応させる関数
export function formatMonth(date : Date) : string {
    // console.log("成形する前の月データ" , date);
    return format(date , "yyyy-MM");
}

import { format } from "date-fns";
//日付をformatに適応させる関数
export function formatMonth(date : Date) : string {
    return format(date , "yyyy-MM");
}

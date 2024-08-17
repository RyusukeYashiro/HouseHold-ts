import { z } from "zod"

export const transactionschema = z.object({
    type : z.enum(["income" , "expense"]),
    date : z.string(),
    amount : z.number().min(1 , {message : "金額は１円以上必須です"}),
    content : z.string().min(1 , {message : "最低でも１文字以上入力してください"}).max(50 , {message : "最低でも５０文字以内で入力してください"}),
    category : z.union([
        z.enum(["食費" , "日用品" , "住居費" , "交際費" , "娯楽" , "急用"]),
        z.enum(["給与" , "副収入" , "お小遣い"]),
        z.literal("")
    ]).refine((val) => val !== "", { message: "カテゴリーを選択してください" })
})

export type SchemaType = z.infer<typeof transactionschema>
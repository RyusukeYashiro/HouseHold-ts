import { Box, Button, ButtonGroup, IconButton, ListItemIcon, MenuItem, Stack, TextField, Typography } from '@mui/material'
import CloseIcon from "@mui/icons-material/Close"; // 閉じるボタン用のアイコン
import { Controller, FieldErrors, SubmitHandler, useForm} from 'react-hook-form';
import { useEffect, useState } from 'react';
import { ExpenseCategory, incomeCategory } from '../../types';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import PaidIcon from '@mui/icons-material/Paid';
import MoneyIcon from '@mui/icons-material/Money';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import EntertainmentIcon from '@mui/icons-material/SportsEsports';
import EmergencyIcon from '@mui/icons-material/Warning';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { zodResolver } from '@hookform/resolvers/zod';
import { SchemaType, transactionschema } from '../../validations/schema';
import { Transaction } from '../../types';


interface onCloseFormprops{
  onCloseForm : () => void;
  closeformcheck : boolean;
  currentDay : string;
  onSaveTransaction : (transaction: SchemaType) => Promise<void>;
  SelectTransaction : Transaction | null;
  setSelectTransaction : React.Dispatch<React.SetStateAction<Transaction | null>>
  onDeleteTransaction : (transactionId: string | readonly string[]) => Promise<void>
}

interface CategoriesType {
  label : incomeCategory | ExpenseCategory;
  icon : JSX.Element;
}

const TransactionForm = ({
  onCloseForm , closeformcheck , currentDay , 
  onSaveTransaction , SelectTransaction , onDeleteTransaction , 
  setSelectTransaction
} : onCloseFormprops) => {

  const expenseCategories : CategoriesType[] = [
    {label : "食費" , icon : <FastfoodIcon fontSize='small'/>},
    {label : "日用品" , icon : <AddShoppingCartIcon fontSize='small'/>},
    {label : "住居費" , icon : <HomeIcon fontSize='small'/>},
    {label : "交際費" , icon : <PeopleIcon fontSize='small'/>},
    {label : "娯楽" , icon : <EntertainmentIcon fontSize='small'/>},
    {label : "急用" , icon : <EmergencyIcon fontSize='small'/>}
  ];

  const incomeCategories : CategoriesType[] = [
    {label : "給与" , icon : <PaidIcon fontSize='small'/>},
    {label : "副収入" , icon : <MoneyIcon fontSize='small'/>},
    {label : "お小遣い" , icon : <MoneyIcon fontSize='small'/>},
  ];

  const [categories , setCategories] = useState(expenseCategories);

  const {control , handleSubmit , setValue , trigger, watch , reset , formState : {errors}} = useForm({
    defaultValues  : {
      type : "expense",
      date : currentDay,
      category : "",
      amount : 0,
      content : "",
    },
    resolver : zodResolver(transactionschema)
  });

  const onSubmit: SubmitHandler<SchemaType> = (Subdata) => {
    console.log("これはformがsubmitされた時", Subdata);
    reset({date : Subdata.date});
    onSaveTransaction(Subdata);
  };
  
  const onError: SubmitHandler<FieldErrors<SchemaType>> = (errors) => {
    console.log("これはformでsubmit-errorが起きた時", errors);
  };

  //typeをwatchで監視
  const currentType = watch("type");

  const changeType = (type : "income" | "expense") => {
    setCategories(type === "expense" ? expenseCategories : incomeCategories);  // カテゴリーの配列を更新
    setValue("type" , type);
    setValue("category" , "")
    trigger("category"); // トリガー再検証
  }

  //日付をformのカレンダーに反映
  useEffect(() => {
    setValue("date" , currentDay);
    // console.log("日付をformのカレンダーに反映しました" , currentDay);
  } , [[currentDay]])

  useEffect(() => {
    // currentTypeに基づいてcategoriesを更新する
    if (SelectTransaction) {
      const applicableCategories = currentType === 'expense' ? expenseCategories : incomeCategories;
      setCategories(applicableCategories);
  
      // 更新されたcategoriesでカテゴリが存在するかチェックする
      const categoryExist = applicableCategories.some(category => category.label === SelectTransaction.category);
  
      // console.log("適用するやつ" , applicableCategories);
      console.log(categoryExist);
  
      // 存在に基づいて値を設定
      setValue("category", categoryExist ? SelectTransaction.category : "");
    }
  }, [SelectTransaction, currentType]);  // currentTypeが変更されたときにuseEffectを実行するように依存関係に含める

  //動的にtransactionメニューがクリックされたらフォームに表示する処理
  useEffect(() => {
    if(SelectTransaction){
      setValue("type" , SelectTransaction.type);
      setValue("date" , SelectTransaction.date);
      setValue("content" , SelectTransaction.content);
      setValue("amount" , SelectTransaction.amount);
    } else {
      reset({
        type: "expense",
        date: currentDay,
        category: "",
        amount: 0,
        content: "",
      });
    }
  } , [SelectTransaction]);

  const handleDelete = () => {
    if(SelectTransaction)
    {
      onDeleteTransaction(SelectTransaction.id);
      setSelectTransaction(null);
    }
  }
  
  return(
    <Box sx={{
      position: "fixed",
      top: 64,
      right : closeformcheck ? 320 : "-2%",
      width: 320,
      height: "100%",
      boxSizing: "border-box",
      bgcolor: "background.paper",
      p: 2,
      boxShadow: "0px 0px 15px -5px #777777",
      zIndex: (theme) => theme.zIndex.drawer - 1,
    }}>
      <Box display={'flex'} justifyContent={"space-between"} mb={2}> 
        <Typography variant='h6'>入力</Typography>
        {/* 閉じるボタン用のアイコン */}
        <IconButton sx={{color: (theme) => theme.palette.grey[500]}} onClick={onCloseForm}>
          <CloseIcon/>
        </IconButton>
      </Box>
      <Box component={"form"} onSubmit={handleSubmit(onSubmit , onError)}>
        <Stack spacing={2}>
          <Controller
          name='type'
          control={control}
          render={({field}) => {
            // console.log(field)
            return(
              <ButtonGroup
              fullWidth
              {...field}
            >
              <Button variant={field.value === 'expense' ? 'contained' : 'outlined'} color='error' onClick={() => changeType('expense')}>
                  支出
              </Button>
              <Button  variant={field.value === 'income' ? 'contained' : 'outlined'} onClick={() => changeType('income')} >収入</Button>
            </ButtonGroup>
            )
          }}>
          </Controller>
          <Controller
            name="date"
            control={control}
            render={({field}) => (
              <TextField
                {...field}
                type='date'
                label="日付"
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="カテゴリー"
                fullWidth
                select
                error={!!errors.category}
                helperText={errors ? errors.category?.message : "カテゴリーを選択してください"}
              >
                {categories.map((category , index) => (
                  <MenuItem value={category.label} key={index}>
                    <ListItemIcon>
                      {category.icon}
                    </ListItemIcon>
                      {category.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value === 0 ? "" : field.value}
                onChange={(e) => {
                  const newValue = parseInt(e.target.value) || 0;
                  field.onChange(newValue);
                }}
                label="金額"
                fullWidth
                error={!!errors.amount}
                helperText={errors.amount?.message}
              />
            )}
          />
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="内容"
                type="text"
                fullWidth
                error={!!errors.content}
                helperText={errors.content?.message}
              />
            )}
          />
          <Button type='submit' variant='contained' color={currentType === "income" ? "primary" : "error"} fullWidth>保存</Button>
          {SelectTransaction && (<Button onClick={handleDelete} variant='outlined' color={'secondary'} fullWidth>削除</Button>)}
        </Stack>
      </Box>
    </Box>
  );
};

export default TransactionForm
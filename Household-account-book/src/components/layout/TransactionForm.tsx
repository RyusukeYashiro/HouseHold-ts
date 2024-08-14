import { Box, Button, ButtonGroup, IconButton, ListItemIcon, MenuItem, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from "@mui/icons-material/Close"; // 閉じるボタン用のアイコン
import { Fastfood } from '@mui/icons-material';

interface onCloseFormprops{
  onCloseForm : () => void;
  closeformcheck : boolean;
}

const TransactionForm = ({onCloseForm , closeformcheck } : onCloseFormprops) => {
  
return (
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
      <Box component={"form"}>
        <Stack spacing={2}>
          <ButtonGroup fullWidth>
            <Button variant={"contained"} color='error'>
              支出
            </Button>
            <Button>収入</Button>
          </ButtonGroup>
          <TextField label="日付" type='date' InputLabelProps={{
              shrink: true, // これによりラベルが常に縮小されて表示されます
            }}/>
          <TextField id='カテゴリー' label='カテゴリー' select value={"食費"}>
            <MenuItem value={"食費"}>
            <ListItemIcon>
              <Fastfood/>
            </ListItemIcon>
            食費
            </MenuItem>
          </TextField>
          <TextField label="金額" type='number'></TextField>
          <TextField label="内容" type='text'></TextField>
          <Button type='submit' variant="contained" color='primary' fullWidth>保存</Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default TransactionForm
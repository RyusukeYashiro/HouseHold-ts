import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { Transaction } from '../types';
import { financeCaul } from '../utils/financeCaul';
import { Grid } from '@mui/material';
import { Theme } from '../theme/theme';
import getCategoryIcon from './common/icon';


interface TransactionTableProps {
  monthlyTransactions : Transaction[];
  handleDeleteTransaction : (transactionId: string | readonly string[]) => Promise<void>
}

interface TransactionTableToolbarProps {
  onDelete : () => void;
  numSelected: number;
}

interface TransactionTableHeadProps {
  numSelected: number;
  rowCount: number;
  onSelectAllClick : (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface financeCaulItemProps{
  title : "expense" | "string";
  value : number;
  color : string;
}

function TransactionTableHead(props: TransactionTableHeadProps) {
  const {numSelected, rowCount , onSelectAllClick} =
    props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            onChange={onSelectAllClick}
            checked={rowCount > 0 && numSelected === rowCount}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        <TableCell align='left'>日付</TableCell>
        <TableCell align='left'>カテゴリー</TableCell>
        <TableCell align='left'>選択</TableCell>
        <TableCell align='left'>内容</TableCell>
      </TableRow>
    </TableHead>
  );
}



function TransactionTableToolbar(props: TransactionTableToolbarProps) {
  const { numSelected , onDelete } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          月の収支
        </Typography>
      )}
      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={onDelete}>
            <DeleteIcon/>
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

function FinanceCaulItem({title , value , color} : financeCaulItemProps){
  return(
      <Grid item  textAlign={'center'} xs={4}>
        <Typography component={"div"}>{title}</Typography>
        <Typography fontWeight={"fontWeightBold"} 
        component={"span"} 
        sx={{color : color , fontSize : {xs : ".8rem" , sm : "1rem" , md : "1.2rem"},
        wordBreak: 'break-word'}}>{value}円</Typography>
      </Grid>
  )
}

// テーブル本体
export default function TransactionTable({ monthlyTransactions , handleDeleteTransaction
} : TransactionTableProps) {

  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleSelectAllClick = (event : React.ChangeEvent<HTMLInputElement>)=> {
    if (event.target.checked) {
      const newSelected = monthlyTransactions.map((n) => n.id);
      console.log("newSelected)" , newSelected);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = () => {
    handleDeleteTransaction(selected)
    setSelected([]);
  }

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - monthlyTransactions.length) : 0;

  // データから指定された数分だけ、情報を取ってくる
  function descTimeSort(a : Transaction , b : Transaction) : number{
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA < dateB ? 1 : (dateA > dateB ? -1 : 0);
  }

  //useMemoを用いて、ページ、データ情報が変わったら表示を切り替える
  const visibleRows = React.useMemo(
    () => {
      const copyMonthlyTransactions = [...monthlyTransactions].sort(descTimeSort);
      return copyMonthlyTransactions.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      );
      },[page, rowsPerPage , monthlyTransactions]);

  //内訳を表示するための機能
  const {income , expense , balance } = financeCaul(monthlyTransactions);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>

        <Grid container>
          <FinanceCaulItem title={"支出"} value={expense} color={Theme.palette.expenseColor.main}/>
          <FinanceCaulItem title={"収入"} value={income} color={Theme.palette.incomeColor.main}/>
          <FinanceCaulItem title={"残高"} value={balance} color={Theme.palette.balanceColor.main}/>
        </Grid>

        {/* tableの名前と右アイコン */}
        <TransactionTableToolbar numSelected={selected.length} onDelete={handleDelete}/>
        {/* 中のtableデータ */}
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <TransactionTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={monthlyTransactions.length}
            />
            <TableBody>
              {visibleRows.map((transaction, index) => {
                const isItemSelected = isSelected(transaction.id);
                const labelId = `enhanced-table-checkbox-${index}`;


                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, transaction.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={transaction.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {transaction.date}
                    </TableCell>
                    <TableCell align="left" sx={{display:'flex' , alignItems:'center'}}>
                      {getCategoryIcon(transaction.category)}
                      {transaction.category}
                    </TableCell>
                    <TableCell align="left">{transaction.amount}</TableCell>
                    <TableCell align="left">{transaction.content}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* tableのページや次にを指すアイコン */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={monthlyTransactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
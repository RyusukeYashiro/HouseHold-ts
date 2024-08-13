import { Box, Button, CardActionArea, CardContent, Drawer, Grid, List, ListItem, Stack, Typography } from '@mui/material'
import EditNoteIcon from '@mui/icons-material/EditNote';
import AddIcon from '@mui/icons-material/Add';
import DailySummary from './DailySummary';
import { Transaction } from '../../types';
import getCategoryIcon from '../common/icon';

export interface transactionProps {
  dailyTransactions : Transaction[];
  currentDay : string
}

const TransactionMenu = ({dailyTransactions , currentDay} : transactionProps) => {
  const menuDrawerWidth = 320;
  return (
    <Drawer
      sx={{
        width: menuDrawerWidth,
        "& .MuiDrawer-paper" : {
          width : menuDrawerWidth,
          top : 64,
          height: `calc(100% - 64px)`,
        }
      }}
      variant={"permanent"}
      anchor={'right'}
      >
        <Stack spacing={2}>
          <Typography fontWeight={"fontWeightBold"}>{currentDay}</Typography>
          <DailySummary dailyTransactions={dailyTransactions}></DailySummary>
          <Box
            sx={{
              display: 'flex',
              justifyContent: `space-between`,
              alignItems: 'center',
              p : 1.5
            }}>
              <Box display={'flex'} alignItems={'center'}>
                <EditNoteIcon sx={{mr : 1}}></EditNoteIcon>
                <Typography variant="body1">内訳</Typography>
              </Box>
              <Button startIcon={<AddIcon></AddIcon>} color="primary" >内訳を追加</Button>
            </Box>
            {/* 取引一覧 */}
            <Box sx={{flexGrow: 1}}>
              <List >
                <Stack spacing={2}>
                  {dailyTransactions.map((transaction) => (
                    <ListItem key={transaction.id} disablePadding>
                    <CardActionArea sx={{width : "100%"}}>
                      <CardContent>
                        <Grid 
                          container 
                          spacing={1} 
                          alignItems={'center'} 
                          >
                          <Grid item xs={1}>
                            {getCategoryIcon(transaction.category)}
                          </Grid>
                          <Grid item xs={2.5}>
                            <Typography display={'block'} gutterBottom >{transaction.category}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography variant="body2" gutterBottom>{transaction.content}</Typography>
                          </Grid>
                          <Grid item xs={4.5}>
                            <Typography
                              gutterBottom
                              textAlign={'right'}
                              sx={{
                                wordBreak: "break-all",
                              }}>{transaction.amount}</Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </CardActionArea>
                  </ListItem>
                  ))}
                </Stack>
              </List>
            </Box>
        </Stack>
    </Drawer>
  )
}

export default TransactionMenu
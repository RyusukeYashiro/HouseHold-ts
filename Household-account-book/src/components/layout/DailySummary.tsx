import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { Transaction } from '../../types'
import { financeCaul } from '../../utils/financeCaul';

interface DailySummaryProps {
    dailyTransactions : Transaction[];
}

const DailySummary = ({dailyTransactions} : DailySummaryProps) => {

    const {income , expense , balance} = financeCaul(dailyTransactions);
    return (
    <Box>
        <Grid container spacing={2}>
            <Grid item xs={6} display={"flex"}>
                <Card sx={{bgcolor : (theme) => theme.palette.grey[100] , flexGrow : 1}}>
                    <CardContent>
                        <Typography variant='body2' noWrap textAlign={'center'}>
                            収入
                        </Typography>
                        <Typography
                            color={(theme) => theme.palette.incomeColor.main}
                            textAlign="right"
                            fontWeight="fontWeightBold"
                            fontSize={15}
                            sx={{ wordBreak: "break-all" }}
                        >
                            {income}円
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6} display={"flex"}>
                <Card
                    sx={{bgcolor : (theme) => theme.palette.grey[100] , flexGrow : 1}}
                >
                    <CardContent>
                        <Typography variant='body2' noWrap textAlign={'center'}>
                            支出
                        </Typography>
                        <Typography
                            color={(theme) => theme.palette.expenseColor.main}
                            textAlign="right"
                            fontWeight="fontWeightBold"
                            fontSize={15}
                            sx={{ wordBreak: "break-all" }}
                        >{expense}円
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} display={"flex"}>
                <Card sx={{bgcolor : (theme) => theme.palette.grey[100] , flexGrow : 1}}>
                    <CardContent>
                        <Typography variant='body2' noWrap textAlign={'center'}>
                            残高
                        </Typography>
                        <Typography
                            color={(theme) => theme.palette.balanceColor.main}
                            textAlign="right"
                            fontWeight="fontWeightBold"
                            fontSize={15}
                            sx={{ wordBreak: "break-all" }}
                        >{balance}円
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </Box>
)
}

export default DailySummary
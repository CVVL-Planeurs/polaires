

import { CalcValuesType, ParamsType, PolaireType } from './types';
import { ChartsXAxis, ChartsYAxis, LineChart,ChartsReferenceLine, ChartsAxisContentProps } from '@mui/x-charts';
import { Box, Typography } from '@mui/material';
export function Chart  ({calcValues, params, curPolaire} : 
  { calcValues: CalcValuesType,
    params: ParamsType,
    curPolaire: PolaireType
}) {

  const max_speed = Math.max(curPolaire.v_no, 200)
  const min_speed = 50

  const range = (start: number, stop: number, step = 1) =>
      Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step)

  const x = range(min_speed-params.Vw,max_speed-params.Vw  )
  const y = x.map (calcValues.f_vz)

  function tooltipContent(props: ChartsAxisContentProps ) {
    const { series, dataIndex, axisData } = props;

    if (!dataIndex) return

    const data = series[0].data
    const v = axisData.x?.value as number
    const tc = data[dataIndex] as number

    const f = (tc && v) ?  ((v/3.6)/(-tc)):0

    return (
    <Box sx={{padding:2, background: '#efefef'}}>
      <Typography>Finesse : {f.toFixed(0)} </Typography>
      <Typography>Taux de chute : {tc.toFixed(2)} m/s </Typography>
    </Box>)
  }


  return (<>
  <LineChart
    width={1024}
    height={400}
    xAxis={[{id:'xAxis', data: x, min:-params.Vw, max:(max_speed*1.1)-params.Vw}]}
    yAxis={[{id: 'yAxis', max: 0, min: -10}]}
    series={[
      { data: y, label: 'Wz', curve: 'linear', showMark: false },

    ]}
    slots= {{
      axisContent: tooltipContent
    }}
    skipAnimation={ true }
    tooltip={{
      trigger: 'axis',
  
    }}
    slotProps={{
      legend: {
          // direction: 'column',
          // position: { vertical: 'middle', horizontal: 'right'}
          hidden: true,
      },
    }}
    grid={{vertical: true, horizontal: true}}
  >
      <ChartsXAxis axisId='xAxis' position='top' label='Vitesse SOL (km/h)'></ChartsXAxis>
      <ChartsYAxis axisId='yAxis' position='left' label='Vitesse verticale (m/s)'></ChartsYAxis>

      <ChartsReferenceLine x={calcValues.Vfmax} label="Finesse max" lineStyle={{ stroke: 'red'}} labelAlign='start' />
      <ChartsReferenceLine y={calcValues.f_vz(calcValues.Vfmax)} label="Finesse max" lineStyle={{ stroke: 'red'}} labelAlign='start' />

      {/* <ChartsReferenceLine x={-1*calcValues.coefs.b / (2*calcValues.coefs.a)}   label="Tx chute min" */}
      {/* labelAlign='end'></ChartsReferenceLine> */}
  </LineChart>

  </>)
}
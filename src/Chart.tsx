

import { max, min } from 'mathjs';
import { PolaireType, CalcValuesType, ParamsType } from './types';
import { ChartsXAxis, LineChart,ChartsReferenceLine } from '@mui/x-charts';
export function Chart  ({polaire, calcValues, params} : { polaire: PolaireType, calcValues: CalcValuesType,
  params: ParamsType
}) {

const range = (start: number, stop: number, step = 1) =>
    Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step)

const x = range(50-params.Vw,200-params.Vw  )
const y = x.map (calcValues.f_vz)

return (<>
<LineChart
  skipAnimation
  width={1024}
  height={400}
  xAxis={[{id:'xAxis', data: x, min:0, max:230}]}
  yAxis={[{id: 'yAxix', max: max (y)< 0 ? 0: max(y)}]}
  series={[
    { data: y, label: 'Wz', curve: 'linear', showMark: false },

  ]}
  slotProps={{
    legend: {
        direction: 'column',
        position: { vertical: 'middle', horizontal: 'right'}
    }
  }}
  grid={{vertical: true, horizontal: true}}
>
    <ChartsXAxis axisId='xAxis' position='top' label='Vitesse SOL (km/h)'></ChartsXAxis>
    <ChartsReferenceLine x={calcValues.Vfmax} label="Finesse max" lineStyle={{ stroke: 'red'}} labelAlign='start' />
    <ChartsReferenceLine y={calcValues.f_vz(calcValues.Vfmax)} label="Finesse max" lineStyle={{ stroke: 'red'}} labelAlign='start' />

    {/* <ChartsReferenceLine x={-1*calcValues.coefs.b / (2*calcValues.coefs.a)}   label="Tx chute min" */}
    {/* labelAlign='end'></ChartsReferenceLine> */}


</LineChart>

</>)
}
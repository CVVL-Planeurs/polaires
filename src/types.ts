export type CalcValuesType = {

  // coefficents polaire
  coefs: {
    a: number,
    b: number,
    c: number
  },
  Vfmax: number,  // vitesse  finesse max
  fin_max: number, // finesse max
  f_vz : (x: number) => number // vz en fonction de vi

}


export type PolaireType = {
    model: string,
    mass: number,
    max_ballast: number, 
    v1: number, 
    w1: number, 
    v2: number, 
    w2: number, 
    v3: number,
    w3: number, 
    wing_area: number, 
    v_no: number, 
    handicap: number, 
    empty_mass: number
}


export type ParamsType  ={
    Vzw: number,  // mouvement vertial de la masse d'air, en m/s
    Vw: number   //   vitesse du vent de face, en km/h
}
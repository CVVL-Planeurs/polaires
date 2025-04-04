export type CalcValuesType = {

  // coefficents polaire
  coefs: {
    a: number,
    b: number,
    c: number
  },
  vfmax: number,  // vitesse  finesse max
  fin_max: number, // finesse max

  vmc : number, // vitesse maccready
  fin_mc: number, // finesse à vitesse maccready
  f_vz : (x: number) => number // vz en fonction de vi
  Mt: number, // masse totale au décollage
  Ca : number // charge alaire



}


export type PolaireType = {
    model: string,
    ref_mass: number,
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
    Vw: number,   //   vitesse du vent de face, en km/h
    Mc: number, // calage Mac Cread
    Mp: number, // masse du pilote
    Mwb: number, // water ballast

}
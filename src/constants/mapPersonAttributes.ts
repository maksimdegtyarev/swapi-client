export type IMapPersonKeys = 'eye_color' | 'gender' | 'hair_color' | 'height' | 'mass' | 'name' | 'skin_color';
export type IMapPersonAttributes = Record<IMapPersonKeys, string>;

export const mapPersonAttributes: IMapPersonAttributes = {
  eye_color: 'Eyes color',
  gender: 'Gender',
  hair_color: 'Hair color',
  height: 'Height',
  mass: 'Weight',
  name: 'Name',
  skin_color: 'Skin color',
};
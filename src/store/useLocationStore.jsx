/*Store file to save device location globally using Zustand */
import { create } from 'zustand';

const useLocationStore = create((set) => ({
  latitude: null,
  longitude: null,
  success: false,
  setLocation: ({ latitude, longitude, success }) =>
    set({ latitude, longitude, success }),
}));

export default useLocationStore;

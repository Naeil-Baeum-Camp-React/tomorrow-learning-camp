import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useAccountStore = create(
  immer((set) => ({
    account: {},
    setAccount: (newAccount) => set((state) => {
      state.account = newAccount;
    }),
  })),
);

export default useAccountStore;
import { create } from 'zustand';

type GameState = 'playing' | 'ready' | 'ended';
type Color = 'red' | 'hotpink' | 'yellow';

interface UIGameDataProps {
  blocksCount: number;
  phase: GameState;
  setPhase: (
    updater: GameState | ((prevState: GameState) => GameState)
  ) => void;
  color: Color;
  setColor: (updater: Color | ((prevState: Color) => Color)) => void;
}

export default create<UIGameDataProps>()((set) => {
  return {
    blocksCount: 3,

    /**
     * Phases
     */
    phase: 'ready',
    setPhase: (updater) =>
      set((state) => ({
        phase: typeof updater === 'function' ? updater(state.phase) : updater,
      })),
    /**
     * box color change
     */
    color: 'red',
    setColor: (updater) =>
      set((state) => ({
        color: typeof updater === 'function' ? updater(state.color) : updater,
      })),
  };
});

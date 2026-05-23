import { useEffect, useState } from 'react';

function App() {
  const [board, setBoard] = useState<number[]>(
    Array.from({ length: 9 }, () => 0)
  );
  const [selectedCell, setSelectedCell] = useState<number | null>(null);

  const players = [
    { name: 'Player X', mark: 'X', score: 8 },
    { name: 'Player O', mark: 'O', score: 6 },
  ];

  const CrossIcon = () => (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-12 w-12 text-black sm:h-16 sm:w-16"
    >
      <path
        d="M6 6L18 18M18 6L6 18"
        fill="none"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth="3.5"
      />
    </svg>
  );

  const CircleIcon = () => (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-12 w-12 text-black sm:h-16 sm:w-16"
    >
      <circle
        cx="12"
        cy="12"
        r="7.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
      />
    </svg>
  );

  const [isX, setIsX] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const handleCellClick = (index: number) => {
    if(winner) return;
    if (board.every((cell) => cell !== 0) && !winner) {
      setWinner('Draw');
      return;
    }
    if (board[index] !== 0) return;

    setSelectedCell(index);
    setBoard((prevBoard) => {
      if (prevBoard[index] !== 0) return prevBoard;
      const nextBoard = [...prevBoard];
      nextBoard[index] = isX ? 1 : -1;
      return nextBoard;
    });
    setIsX(!isX);
  };

  useEffect(() => {
    console.log(board);
    const checkDiagonalWin = (): string | null => {
      let sumMain = 0;
      let sumAnti = 0;

      // main diagonal: 0, 4, 8
      for (let i = 0; i < 3; i++) {
        sumMain += board[i * 4];
      }

      // anti-diagonal: 2, 4, 6
      for (let i = 2; i <= 6; i += 2) {
        sumAnti += board[i];
      }

      if (sumMain === 3 || sumAnti === 3)
        return 'X';
      if (sumMain === -3 || sumAnti === -3 )
        return 'O';
      return null;
    };

    const checkHorizontal = (): string | null => {
      let sumLineOne = 0;
      let sumLineTwo = 0;
      let sumLineThree = 0;

      for (let i = 0; i < 3; i++) {
        sumLineOne += board[i];
      }
      for (let i = 3; i < 6; i++) {
        sumLineTwo += board[i];
      }
      for (let i = 6; i < 9; i++) {
        sumLineThree += board[i];
      }
      if (sumLineOne === 3 || sumLineTwo === 3 || sumLineThree === 3)
        return 'X';
      if (sumLineOne === -3 || sumLineTwo === -3 || sumLineThree === -3)
        return 'O';
      return null;
    };

    const checkVertical = (): string | null => {
      let sumLineOne = 0;
      let sumLineTwo = 0;
      let sumLineThree = 0;

      for (let i = 0; i <= 6; i += 3) {
        sumLineOne += board[i];
      }
      for (let i = 1; i <= 7; i += 3) {
        sumLineTwo += board[i];
      }
      for (let i = 2; i <= 8; i += 3) {
        sumLineThree += board[i];
      }

      if (sumLineOne === 3 || sumLineTwo === 3 || sumLineThree === 3)
        return 'X';
      if (sumLineOne === -3 || sumLineTwo === -3 || sumLineThree === -3)
        return 'O';
      return null;
    };

    const val = checkDiagonalWin() || checkHorizontal() || checkVertical();
    if(val && !winner){
      setWinner(val)
    }
    console.log(val);
  }, [board]);

  const renderMark = (value: number) => {
    if (value === 1) return <CrossIcon />;
    if (value === -1) return <CircleIcon />;
    return <span aria-hidden="true" />;
  };

  const activeMark = isX ? 'X' : 'O';

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_#fff36a_0%,_#fff36a_18%,_#f5efe6_18%,_#f5efe6_48%,_#f03c3c_48%,_#f03c3c_56%,_#f5efe6_56%,_#f5efe6_100%)] px-4 py-6 text-black sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col gap-6 border-[6px] border-black bg-[#f5efe6] p-4 shadow-[14px_14px_0_#000] sm:p-6 lg:p-8">
        <header className="grid gap-4 border-[4px] border-black bg-white p-4 shadow-[8px_8px_0_#000] md:grid-cols-[1.4fr_0.9fr] md:items-end">
          <div className="space-y-3">
            <p className="w-fit border-2 border-black bg-[#fff36a] px-3 py-1 text-xs font-black uppercase tracking-[0.4em]">
              Brutalist Arcade
            </p>
            <h1 className="max-w-3xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-6xl lg:text-8xl">
              Tic Tac Toe
            </h1>
            <p className="max-w-xl text-sm font-semibold uppercase tracking-[0.28em] text-black/75 sm:text-base">
              3 by 3 game board, stripped down to the essentials and styled like
              a neon print shop crash.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
            <div className="border-[3px] border-black bg-[#f03c3c] p-3 text-white shadow-[6px_6px_0_#000]">
              <p className="text-[0.65rem] font-black uppercase tracking-[0.35em]">
                Current Turn
              </p>
              <p className="mt-2 text-3xl font-black">{isX ? 'X' : 'O'}</p>
            </div>
            <div className="border-[3px] border-black bg-[#fff36a] p-3 shadow-[6px_6px_0_#000]">
              <p className="text-[0.65rem] font-black uppercase tracking-[0.35em]">
                Status
              </p>
              <p className="mt-2 text-lg font-black uppercase">
                Mock board only
              </p>
            </div>
            <div className="border-[3px] border-black bg-[#66d9ff] p-3 shadow-[6px_6px_0_#000]">
              <p className="text-[0.65rem] font-black uppercase tracking-[0.35em]">
                Mode
              </p>
              <p className="mt-2 text-lg font-black uppercase">Static UI</p>
            </div>
          </div>
        </header>

        <section className="grid flex-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="border-[4px] border-black bg-[#fff6ea] p-4 shadow-[10px_10px_0_#000] sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-4 border-b-4 border-black pb-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.5em] text-black/70">
                  Arena
                </p>
                <h2 className="mt-1 text-2xl font-black uppercase tracking-[-0.04em] sm:text-3xl">
                  3 × 3 board
                </h2>
              </div>

              <div className="hidden items-center gap-2 rounded-full border-2 border-black bg-white px-3 py-2 text-xs font-black uppercase tracking-[0.35em] sm:flex">
                <span className="inline-flex h-3 w-3 rounded-full bg-[#f03c3c]" />
                Hard-edged layout
              </div>
            </div>

            <div className="grid aspect-square grid-cols-3 gap-0 border-[4px] border-black bg-black shadow-[12px_12px_0_#000]">
              {board.map((mark, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleCellClick(index)}
                  className={`group flex items-center justify-center border border-black bg-white transition-transform duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_#000] focus:outline-none ${selectedCell === index ? 'ring-4 ring-[#f03c3c]/70 ring-inset' : ''}`}
                  aria-label={`Board cell ${index + 1}`}
                >
                  <span className="flex h-full w-full items-center justify-center p-4 sm:p-6">
                    {renderMark(mark)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <aside className="grid gap-6">
            <section className="border-[4px] border-black bg-[#66d9ff] p-4 shadow-[10px_10px_0_#000] sm:p-6">
              <p className="text-xs font-black uppercase tracking-[0.5em] text-black/70">
                Scoreboard
              </p>
              <div className="mt-4 grid gap-3 ">
                {players.map((player) => (
                  <article
                    key={player.name}
                    className={`flex items-center justify-between gap-4 border-[3px] border-black p-3 shadow-[4px_4px_0_#000] ${player.mark === activeMark ? (player.mark === 'X' ? 'bg-[#fff36a]' : 'bg-[#f03c3c] text-white') : 'bg-white'}`}
                  >
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.35em] text-black/60">
                        {player.name}
                      </p>
                      <p className="mt-1 text-xl font-black uppercase">
                        Mark {player.mark}
                      </p>
                    </div>
                    <div
                      className={`min-w-16 border-[3px] border-black px-3 py-2 text-center text-2xl font-black ${player.mark === 'X' ? 'bg-[#fff36a]' : 'bg-[#f03c3c] text-white'}`}
                    >
                      {player.score}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="border-[4px] border-black bg-white p-4 shadow-[10px_10px_0_#000] sm:p-6">
              <p className="text-xs font-black uppercase tracking-[0.5em] text-black/70">
                Visual Notes
              </p>
              <ul className="mt-4 space-y-3 text-sm font-semibold uppercase tracking-[0.2em]">
                <li className="border-l-4 border-[#f03c3c] pl-3">
                  Thick borders and hard shadows
                </li>
                <li className="border-l-4 border-[#66d9ff] pl-3">
                  Oversized type and poster-like rhythm
                </li>
                <li className="border-l-4 border-[#fff36a] pl-3">
                  X and O icons built as inline SVG
                </li>
              </ul>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}

export default App;

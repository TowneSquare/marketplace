import NftCard from '../../../components/nft_card';
import { useAppSelector } from '../../../state/hooks';
import FilterType from '../../../type/filter_type';

const Board = () => {
  const isFetching = useAppSelector(state => state.tokensState.isFetching);

  const filter = useAppSelector((state) => state.tokensState.filter);
  const nfts = useAppSelector((state) => state.tokensState.nfts);

  const filtered =
    filter == FilterType.composable
      ? nfts.filter((nft) => nft.type == 'composable')
      : nfts.filter((nft) => nft.type != 'composable');
  
  if(isFetching) {
    return (
      <div className="flex w-full h-full min-h-[200px] justify-center items-center">
        <img src="/generate/loader.svg" className="w-24"/>
      </div>
    )
  }
  return (
    <div className="flex h-full flex-wrap gap-4 items-baseline">
      {filtered.map((nft, index) => (
        <NftCard data={nft} index={index} key={index} />
      ))}
    </div>
  );
};

export default Board;

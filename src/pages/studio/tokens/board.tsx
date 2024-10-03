import NftCard from '../../../components/nft_card';
import { useCollectionTokenData } from '../../../hooks';
import { useAppSelector } from '../../../state/hooks';
import FilterType from '../../../type/filter_type';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

const Board = () => {
  const isFetching = useAppSelector(state => state.tokensState.isFetching);
  const nfts = useAppSelector((state) => state.tokensState.nfts);
   const currentCollection = useAppSelector(
    (state) => state.tokensState.currentCollection
  );
  const {account} = useWallet()


  const collectionToken = useCollectionTokenData({
    accountAddress: account?.address.toString(),
    collectionAddress: currentCollection?.collection_id
  })

  console.log(collectionToken.data, "collectionToken")
  
  if(isFetching) {
    return (
      <div className="flex w-full h-full min-h-[200px] justify-center items-center">
        <img src="/generate/loader.svg" className="w-24"/>
      </div>
    )
  }
  return (
    <div className="flex flex-wrap items-baseline h-full gap-4">
      {nfts.map((nft, index) => (
        <NftCard data={nft} index={index} key={index} />
      ))}
    </div>
  );
};

export default Board;

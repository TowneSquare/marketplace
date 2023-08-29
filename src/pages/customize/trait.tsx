import { useEffect, useState } from "react";
import { useAppSelector } from "../../state/hooks";
import { NftMetadataType } from "../../type/nft_type";
import { NFTS } from "../../state/constants";
import SecondaryButton from "../../components/secondary_button";
import ButtonStatus from "../../type/button_status";

interface Props {
   data: NftMetadataType | undefined
}
const Trait: React.FC<Props> = ({ data }) => {
   const address = useAppSelector(state => state.tokensState.traitAddress);
   const [token, setToken] = useState<NftMetadataType | undefined>(undefined);
   useEffect(() => {
      if (address) {
         let tokens = NFTS.filter((nft) => nft.address == address);
         if (tokens.length > 0)
            setToken(tokens[0])
      }
   }, [address])
   return (
      <>
         {address ?
            <div className="w-[30vw] p-10 flex flex-col rounded-md bg-gray-dark-2">
               <div className="w-64 h-64 bg-gray-dark-1 rounded-md">
                  <img src={token?.uri} alt="uri" className="w-full h-full" />
               </div>
               <div className="flex gap-2 mt-4">
                  <p className="text-[14px] text-gray-light-1 font-semibold">
                     {data?.collection}
                  </p>
                  <img src="/nft-card/polygon-check.svg" alt="check" />
               </div>
               <p className="text-[14px] text-gray-light-1 pt-4 font-semibold">
                  {token?.collection}
               </p>
               <p className="text-[14px] font-semibold">
                  {token?.name}
               </p>
               <p className="text-[14px] mt-4">
                  NFT Description lorem ipsum dolro sit amet qot lorem ipsum dolro sit amet qot
               </p>
               <SecondaryButton type={ButtonStatus.active} className="mt-4 flex justify-center">
                  <div className="flex gap-2">
                     <img src="/customize/replace.svg" alt="replace" />
                     <span>Replace Trait</span>
                  </div>
               </SecondaryButton>
               <SecondaryButton type={ButtonStatus.active} className="mt-4 flex justify-center">
                  <div className="flex gap-2">
                     <img src="/customize/remove.svg" alt="replace" />
                     <span>Remove Trait</span>
                  </div>
               </SecondaryButton>
               <div className="flex items-center gap-2 mt-2">
                  <img src="/customize/alert.svg" alt="alert" />
                  <p className="text-[14px]">
                     Removed item is transferred back to your wallet
                  </p>
               </div>
            </div>
            :
            <div className="w-[30vw] h-[100vh] flex flex-col justify-center items-center rounded-md bg-gray-dark-2">
               <img src="/customize/non-trait.svg" alt="trait" />
               <p className="font-semibold text-center mt-4">
                  Select a Trait to replace it or<br />
                  remove it from the NFT
               </p>
            </div>
         }
      </>
   )
}

export default Trait;
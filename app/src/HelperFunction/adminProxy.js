import { CONTRACT_ADDRESS, ProxyAdminAbi } from './config';
import getWeb3 from "./getWeb";
window.ownerProxy  = () => {
    return new Promise(async(resolve, reject) => {
        try {
            const web3 = await getWeb3();
            const owner_contract = new web3.eth.Contract(ProxyAdminAbi, CONTRACT_ADDRESS);
            const accounts = await web3.eth.getAccounts();

            window.userAddress = accounts[0];
            window.owner_contract = owner_contract;
           
        } catch (err) {
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`
            );
            console.error(err);
        }
    })
};

pragma solidity ^0.8.0;

//SPDX-License-Identifier: UNLICENSED

abstract contract Initializable {

    bool private _initialized;

    bool private _initializing;

    modifier initializer() {
        require(_initializing || !_initialized, "Initializable: contract is already initialized");

        bool isTopLevelCall = !_initializing;
        if (isTopLevelCall) {
            _initializing = true;
            _initialized = true;
        }

        _;

        if (isTopLevelCall) {
            _initializing = false;
        }
    }
}

library SafeMath {
  
    function tryAdd(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            uint256 c = a + b;
            if (c < a) return (false, 0);
            return (true, c);
        }
    }


    function trySub(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b > a) return (false, 0);
            return (true, a - b);
        }
    }

   
    function tryMul(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (a == 0) return (true, 0);
            uint256 c = a * b;
            if (c / a != b) return (false, 0);
            return (true, c);
        }
    }

   
    function tryDiv(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a / b);
        }
    }

   
    function tryMod(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a % b);
        }
    }

    
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        return a + b;
    }

  
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return a - b;
    }

 
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        return a * b;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return a / b;
    }

  
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return a % b;
    }

   
    function sub(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b <= a, errorMessage);
            return a - b;
        }
    }

   
    function div(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a / b;
        }
    }

    function mod(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a % b;
        }
    }
}

contract BDLTCommunityV2 is Initializable {
    using SafeMath for uint256;

    struct User {
        uint256 id;
        address referrer;
        uint256 partnersCount;
        uint8 reward_status;
        uint256 levelIncome;
        uint256 rewardIncome;
        uint256 sponcerIncome;
		uint256 checkpoint;
        uint256 start;
        uint256 joiningAmt;
        uint256 end;
        uint256 withdrawn;
        bool isNodebuy;
        Node node;
    }

    struct Node{
       uint256 stake_time;
       uint256 unstake_time;
       uint256 stairIncome;
       Roi[] referral_roi;
       uint256 joiningAmt;
       uint256 checkpoint;
       uint256 withdrawn;
    }

    struct Roi {
        address user;
        uint256 start;
        uint256 end;
    }

    uint256 public joiningPackage;
    mapping(address => User) public users;
    mapping(uint256 => address) public idToAddress;
    uint256 public totalRoyality;
    uint256 public lastUserId;
    uint256 public totalNodeBuy;
    uint256 public nodejoiningamt;
    address public owner;
    address public dev;

    uint256 public price;
    uint256 public TIME_STEP;

    event Registration(address indexed user,address indexed referrer,uint256 indexed userId,uint256 referrerId,uint256 amount);
    event UserIncome(address sender,address receiver,uint256 amount,uint8 level,string _for );
    event Withdrawn(address user, uint256 amount,uint8 _type);
    event RoyaltyDeduction(address user,uint256 amount);
    event PriceChanged(uint256 newPrice);
    event RoyalityIncome(address user,uint256 amount);
    event StakeNode(address user,uint256 amount);
    event RewardRoi(address user, address _sender,string _type,uint8 level);
    event UnstakeNode(address user);

    receive () external payable {}
    
    modifier onlyDev() {
        require(dev == msg.sender, "Ownable: caller is not the developer");
        _;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    function initialize(address _ownerAddress,address _devwallet,uint256 joiningAmt,uint256 _nodejoiningamt)
        public
        initializer
    {
        // joiningPackage = ((100*1e18)/bdltInUsd)*(1e18);
        joiningPackage = joiningAmt;
        // price = bdltInUsd;
        dev = _devwallet;
        nodejoiningamt = _nodejoiningamt;
        lastUserId = 1;
        owner = _ownerAddress;

        TIME_STEP = 30 days;

        users[owner].id = block.timestamp;
        users[owner].referrer = address(0);
        users[owner].partnersCount = uint256(0);
        users[owner].start = block.timestamp;
        users[owner].end = block.timestamp.add(608 days);
        users[owner].joiningAmt = joiningPackage;
        idToAddress[users[owner].id] = owner;

        emit Registration(owner, address(0), users[owner].id, 0,joiningPackage);
    }

    function registrationExt(address user,address referrerAddress) external payable {
        registration(user, referrerAddress);
    }
    /* for preuser */
    
    function OwnerRegistration(address userAddress, address referrerAddress) external onlyOwner {
        // require(msg.value>= joiningPackage,"Low Balance!");
        require(!isUserExists(userAddress), "User Exists!");
        require(isUserExists(referrerAddress), "Referrer not Exists!");
        uint32 size;
        assembly {
            size := extcodesize(userAddress)
        }
        require(size == 0, "cannot be a contract!");
        Owner_calculateReferrerReward(joiningPackage,referrerAddress,userAddress);
        users[userAddress].id = block.timestamp; 
        idToAddress[users[userAddress].id] = userAddress;       
        users[userAddress].referrer = referrerAddress;
        users[userAddress].partnersCount = 0;
        users[userAddress].joiningAmt=joiningPackage;
        lastUserId++;
        users[referrerAddress].partnersCount++;
        if(users[referrerAddress].partnersCount==10){
            users[users[referrerAddress].referrer].reward_status+=1;
        }
        // payable(referrerAddress).transfer(joiningPackage.mul(10).div(100));
        users[userAddress].start = block.timestamp;
        users[userAddress].end = block.timestamp.add(608 days);
        users[userAddress].joiningAmt=joiningPackage;
        users[referrerAddress].sponcerIncome+=joiningPackage.mul(10).div(100);
        emit UserIncome(userAddress,referrerAddress,joiningPackage.mul(10).div(100),1,"direct_sponcer");
        emit Registration(userAddress,referrerAddress,users[userAddress].id,users[referrerAddress].id,joiningPackage);
        totalRoyality+=joiningPackage.mul(155).div(1000);
        emit RoyaltyDeduction(userAddress,joiningPackage.mul(155).div(1000));
    }

    function Owner_calculateReferrerReward(uint256 _investment, address _referrer,address sender) private {
         address new_referrer=_referrer;
 
        (uint256 noOfuser,uint256 noOfArchiver) = _calculateArchiver(_referrer);

	     for(uint8 i=1;i<=40;i++)
	     {
	        if(new_referrer!=address(0) && users[new_referrer].partnersCount>=2){
                // payable(new_referrer).transfer(_investment.mul(40).div(100).div(noOfuser)); 
                users[new_referrer].levelIncome=users[new_referrer].levelIncome.add(_investment.mul(40).div(100).div(noOfuser));
                emit UserIncome(sender,new_referrer,_investment.mul(40).div(100).div(noOfuser),i,"level_income");
            }
             if(users[new_referrer].referrer!=address(0))
                new_referrer=users[new_referrer].referrer;
            else
                break;
	         
	     }
	     for(uint8 i=1;i<=40;i++)
	     {
	        if(_referrer!=address(0) && users[_referrer].partnersCount>=10 && users[_referrer].reward_status>=2){
                // payable(_referrer).transfer(_investment.mul(15).div(100).div(noOfArchiver)); 
                users[_referrer].rewardIncome=users[_referrer].rewardIncome.add(_investment.mul(15).div(100).div(noOfArchiver));
                emit UserIncome(sender,_referrer,_investment.mul(15).div(100).div(noOfArchiver),i,"reward_income");
            }
             if(users[_referrer].referrer!=address(0))
                _referrer=users[_referrer].referrer;
            else
                break;
	         
	     }
    }

    /* for preuser */

    function registration(address userAddress, address referrerAddress) private {
        require(msg.value>= joiningPackage,"Low Balance!");
        require(!isUserExists(userAddress), "User Exists!");
        require(isUserExists(referrerAddress), "Referrer not Exists!");
        uint32 size;
        assembly {
            size := extcodesize(userAddress)
        }
        require(size == 0, "cannot be a contract!");
        _calculateReferrerReward(joiningPackage,referrerAddress,userAddress);
        users[userAddress].id = block.timestamp; 
        idToAddress[users[userAddress].id] = userAddress;       
        users[userAddress].referrer = referrerAddress;
        users[userAddress].partnersCount = 0;
        users[userAddress].joiningAmt=joiningPackage;
        lastUserId++;
        users[referrerAddress].partnersCount++;
        if(users[referrerAddress].partnersCount==10){
            users[users[referrerAddress].referrer].reward_status+=1;
        }
        payable(referrerAddress).transfer(joiningPackage.mul(10).div(100));
        users[userAddress].start = block.timestamp;
        users[userAddress].end = block.timestamp.add(608 days);
        users[userAddress].joiningAmt=joiningPackage;
        users[referrerAddress].sponcerIncome+=joiningPackage.mul(10).div(100);
        emit UserIncome(userAddress,referrerAddress,joiningPackage.mul(10).div(100),1,"direct_sponcer");
        emit Registration(userAddress,referrerAddress,users[userAddress].id,users[referrerAddress].id,joiningPackage);
        totalRoyality+=joiningPackage.mul(155).div(1000);
        emit RoyaltyDeduction(userAddress,joiningPackage.mul(155).div(1000));
    }

    function _calculateReferrerReward(uint256 _investment, address _referrer,address sender) private {
         address new_referrer=_referrer;
 
        (uint256 noOfuser,uint256 noOfArchiver) = _calculateArchiver(_referrer);

	     for(uint8 i=1;i<=40;i++)
	     {
	        if(new_referrer!=address(0) && users[new_referrer].partnersCount>=2){
                payable(new_referrer).transfer(_investment.mul(40).div(100).div(noOfuser)); 
                users[new_referrer].levelIncome=users[new_referrer].levelIncome.add(_investment.mul(40).div(100).div(noOfuser));
                emit UserIncome(sender,new_referrer,_investment.mul(40).div(100).div(noOfuser),i,"level_income");
            }
             if(users[new_referrer].referrer!=address(0))
                new_referrer=users[new_referrer].referrer;
            else
                break;
	         
	     }
	     for(uint8 i=1;i<=40;i++)
	     {
	        if(_referrer!=address(0) && users[_referrer].partnersCount>=10 && users[_referrer].reward_status>=2){
                payable(_referrer).transfer(_investment.mul(15).div(100).div(noOfArchiver)); 
                users[_referrer].rewardIncome=users[_referrer].rewardIncome.add(_investment.mul(15).div(100).div(noOfArchiver));
                emit UserIncome(sender,_referrer,_investment.mul(15).div(100).div(noOfArchiver),i,"reward_income");
            }
             if(users[_referrer].referrer!=address(0))
                _referrer=users[_referrer].referrer;
            else
                break;
	         
	     }
    }
    
    function _calculateArchiver(address _referrer) public view returns (uint256 ,uint256 ){
        uint256 noOfArchiver=0;
        uint256 noOfuser=0;
	     for(uint8 i=1;i<=40;i++)
	     {
	        if(_referrer!=address(0) && users[_referrer].partnersCount>=2){
               noOfuser++;
            }
            if(_referrer!=address(0) && users[_referrer].partnersCount>=10 && users[_referrer].reward_status>=2){
                noOfArchiver++;
            }
            if(users[_referrer].referrer!=address(0))
                _referrer=users[_referrer].referrer;
            else 
                break;
	     }
         return (noOfuser,noOfArchiver);
    }
     
    function isUserExists(address user) public view returns (bool) {
        return (users[user].id != 0);
    }

	function getUserDividends(address userAddress) public view returns (uint256) {
		User storage user = users[userAddress];
            uint256 totalAmount;
			uint256 finish = user.end;
			if (user.checkpoint < finish) {
				uint256 share = user.joiningAmt.mul(10).div(100);
				uint256 from = user.start > user.checkpoint ? user.start : user.checkpoint;
				uint256 to = finish < block.timestamp ? finish : block.timestamp;
				if (from < to) {
					totalAmount = totalAmount.add(share.mul(to.sub(from)).div(TIME_STEP));
				}
			}

		return totalAmount;
	}

    function withdraw() external payable{
        require(isUserExists(msg.sender),"User not Exist!");
		User storage user = users[msg.sender];
		uint256 totalAmount = getUserDividends(msg.sender);
		require(totalAmount > 0, "User has no dividends");
        require(totalAmount<address(this).balance,"contract have less balance");
		user.checkpoint = block.timestamp;
		user.withdrawn = user.withdrawn.add(totalAmount);
		payable(msg.sender).transfer(totalAmount);
		emit Withdrawn(msg.sender, totalAmount,1);
	}

    function ChangeJoiningAmt(uint256 joingAmt ) external onlyDev{
        joiningPackage= joingAmt;
    }

    function SendRoyalityIncome(address user, uint256 amount) external onlyDev {
        require(isUserExists(user),"User not exist !");
        require(amount>0 ,"Amount is Low");
        payable(user).transfer(amount);
        totalRoyality-=amount;
        emit RoyalityIncome(user,amount);
    }

    function withdrawETH( address payable _receiver,uint256 amt)
        public
        payable
        onlyOwner
    {
        _receiver.transfer(amt);
    }

    function changeDevwallet(address newWallet) external onlyOwner {
        dev = newWallet;
    }

    function changeOwnership(address newWallet) external onlyOwner {
        owner = newWallet;
    }

    function stakeNode(address userAddress) external payable {
        require(msg.value>=nodejoiningamt,"Low Balance!");
        require(isUserExists(userAddress),"User not Exist!");
        require(!users[userAddress].isNodebuy,"User Already Staked for Node!");
        users[userAddress].isNodebuy = true;
        users[userAddress].node.stake_time = block.timestamp; 
        users[userAddress].node.joiningAmt = nodejoiningamt;
        users[users[userAddress].referrer].node.referral_roi.push(Roi(userAddress,block.timestamp,block.timestamp.add(356 days)));
        emit RewardRoi(users[userAddress].referrer,userAddress,"sponcer_roi",1);
        address _referrer =users[userAddress].referrer;
        (uint256 noOfuser, ) = _calculateArchiver(_referrer);
        for(uint8 i=1;i<=40;i++)
	     {
	        if(_referrer!=address(0) && users[_referrer].partnersCount>=2){
                payable(_referrer).transfer(nodejoiningamt.mul(10).div(100).div(noOfuser)); 
                users[_referrer].node.stairIncome=users[_referrer].node.stairIncome.add(nodejoiningamt.mul(10).div(100).div(noOfuser));
                emit UserIncome(userAddress,_referrer,nodejoiningamt.mul(10).div(100).div(noOfuser),i,"node_stair_income");
            }
            if(users[_referrer].referrer!=address(0))
                _referrer=users[_referrer].referrer;
            else 
                break;
        }
        totalNodeBuy++;
        emit StakeNode(userAddress,nodejoiningamt);
    }

    function getNodeStakingReward(address userAddress) public view returns(uint256 amount){
        User storage user = users[userAddress];
            uint256 totalAmount;
			uint256 finish = user.node.unstake_time==0&&user.isNodebuy==true?block.timestamp.add(1 days):user.node.unstake_time;
			if (user.node.checkpoint < finish) {
				uint256 share = user.node.joiningAmt.mul(5).div(100);
				uint256 from = user.node.stake_time > user.node.checkpoint ? user.node.stake_time : user.node.checkpoint;
				if (from < block.timestamp) {
					totalAmount = totalAmount.add(share.mul(block.timestamp.sub(from)).div(TIME_STEP));
				}
			}

		return totalAmount;
    }

    function getDirectSponcerNodeReward(address userAddress) public view returns (uint256 amount) {
           User storage user = users[userAddress];
            uint256 totalAmount;
            for(uint8 i=0; i<user.node.referral_roi.length;i++){
                Roi memory roi = user.node.referral_roi[i];
                uint256 finish = users[roi.user].node.unstake_time==0&&users[roi.user].isNodebuy==true?block.timestamp.add(100 days):users[roi.user].node.unstake_time;
                if (user.node.checkpoint < finish) {
                    uint256 share = users[roi.user].node.joiningAmt.mul(2).div(100);
                    uint256 from = users[roi.user].node.stake_time > user.node.checkpoint ? users[roi.user].node.stake_time : user.node.checkpoint;
                    if (from < block.timestamp) {
                        totalAmount += totalAmount.add(share.mul(block.timestamp.sub(from)).div(TIME_STEP));
                    }
                }
            }

		return totalAmount;
    }

    function getNodeRewardWithdraw() public payable {
        require(isUserExists(msg.sender),"User not Exist!");
		User storage user = users[msg.sender];
		uint256 _selfRoi = getNodeStakingReward(msg.sender);
		uint256 _sponcerRoi = getDirectSponcerNodeReward(msg.sender);
		require(_sponcerRoi.add(_selfRoi) > 0, "User has no dividends");
        require(_sponcerRoi.add(_selfRoi)<address(this).balance,"contract have less balance");
		user.node.checkpoint = block.timestamp;
		user.node.withdrawn = user.node.withdrawn.add(_sponcerRoi.add(_selfRoi));
		payable(msg.sender).transfer(_sponcerRoi.add(_selfRoi));
		emit Withdrawn(msg.sender,_sponcerRoi.add(_selfRoi),2);
    }

    function unstakeNode(address userAddress) external payable {
        require(isUserExists(userAddress),"User not Exist!");
        require(users[userAddress].isNodebuy,"User Not Staked for Node!");
        require(users[userAddress].node.stake_time.add(356 days)>block.timestamp,"Staking time not completed!");
        users[userAddress].isNodebuy = false;
        users[userAddress].node.unstake_time = block.timestamp; 
        payable(userAddress).transfer(users[userAddress].node.joiningAmt);
        getNodeRewardWithdraw();
        totalNodeBuy--;
        emit UnstakeNode(userAddress);
    }
    
}
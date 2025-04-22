import ContentPreference from './tabs/content-preference';
import PaymentSetting from './tabs/payment-setting';
import PrivacyAndSecurity from './tabs/privacy-and-security';
import ProfileSetting from './tabs/profile-setting-tab/profile-setting';
import TruthifyAPI from './tabs/truthify-apis';
const tabComponents = {
    "profile": ProfileSetting,
    "privacy&security": PrivacyAndSecurity,
    "payment":PaymentSetting,
    "content preference":ContentPreference,
    "api":TruthifyAPI
  };

  
function  AccountSetting({activeTab}) {

    const TabComponent= tabComponents[activeTab]
  return (
    <div className='w-full py-2'>
      {TabComponent && <TabComponent/>}
     
    </div>
  )
}

export default  AccountSetting

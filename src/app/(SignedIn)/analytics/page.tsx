import { HasPermission } from "@/components/HasPermission";
import { canAccessAnalytics } from "@/server/permissions";

export default function SubscriptionPage() {
  return <div>
    <p className="text-3xl mb-8">Your Analytics</p>

    <HasPermission 
        permission={canAccessAnalytics} 
        renderFallback 
        fallbackText="This feature is only available if you have a subscription. Try upgrading your account to add more."
    >
        <p>You can only see this if you have a subscription</p>
    </HasPermission>

  </div>
}

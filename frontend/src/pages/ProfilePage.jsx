import { useAuthStore } from "../store/useAuthStore";
import ProfilePictureUpload from "../components/ProfilePictureUpload";
import { format } from "date-fns";

const ProfilePage = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Profile</h2>
          <p className="text-sm text-base-content/70">Manage your profile information</p>
        </div>

        <div className="bg-base-100 rounded-lg shadow-lg p-6">
          <div className="flex flex-col items-center gap-6">
            <ProfilePictureUpload 
              currentProfilePic={authUser.profilePic}
              onUpdate={() => {
                // Refresh the page or update the user data
                window.location.reload();
              }}
            />
            
            <div className="w-full max-w-md space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={authUser.fullName}
                  readOnly
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered"
                  value={authUser.email}
                  readOnly
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Joined Date</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={format(new Date(authUser.createdAt), "MMMM d, yyyy")}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

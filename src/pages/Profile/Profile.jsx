import { motion } from 'framer-motion';
import { IoMail, IoPerson, IoCall, IoFlag, IoShield } from 'react-icons/io5';
import DashboardLayout from '../../components/layout/DashboardLayout';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/ui/Card';
import { useAuth } from '../../context/AuthContext';
import { getInitials } from '../../utils/helpers';
import { COUNTRY_OPTIONS } from '../../utils/constants';

const Profile = () => {
  const { user } = useAuth();

  const getCountryName = (code) => {
    const country = COUNTRY_OPTIONS.find((c) => c.code === code);
    return country ? `${country.flag} ${country.name}` : code;
  };

  const getKYCStatus = (status) => {
    const statuses = {
      not_started: { label: 'Not Started', color: 'bg-gray-100 text-gray-800' },
      pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
      approved: { label: 'Approved', color: 'bg-green-100 text-green-800' },
      rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800' },
    };
    return statuses[status] || statuses.not_started;
  };

  const kycStatus = getKYCStatus(user?.kycStatus);

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <PageHeader title="Profile" subtitle="Manage your account information" />

        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {getInitials(`${user?.firstName} ${user?.lastName}`)}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-gray-600">{user?.email}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${kycStatus.color}`}
                  >
                    KYC: {kycStatus.label}
                  </span>
                  {user?.isEmailVerified && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      ✓ Email Verified
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Personal Information */}
          <Card className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Personal Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <IoPerson className="text-primary-600" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-semibold text-gray-800">
                    {user?.firstName} {user?.lastName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <IoMail className="text-primary-600" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Email Address</p>
                  <p className="font-semibold text-gray-800">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <IoFlag className="text-primary-600" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Country</p>
                  <p className="font-semibold text-gray-800">{getCountryName(user?.country)}</p>
                </div>
              </div>

              {user?.phone && (
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <IoCall className="text-primary-600" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Phone Number</p>
                    <p className="font-semibold text-gray-800">{user?.phone}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Account Security */}
          <Card className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Account Security</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <IoShield className="text-green-600" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600">Email verification enabled</p>
                  </div>
                </div>
                <span className="text-green-600 font-semibold">Active</span>
              </div>
            </div>
          </Card>

          {/* KYC Status */}
          <Card className="bg-gradient-to-br from-blue-50 to-primary-50 border border-blue-100">
            <h3 className="font-semibold text-gray-800 mb-3">KYC Verification</h3>
            <p className="text-sm text-gray-700 mb-4">
              Your KYC status is managed by our payment provider (Rapyd). Current status:{' '}
              <span className="font-semibold">{kycStatus.label}</span>
            </p>
            {user?.kycStatus === 'not_started' && (
              <p className="text-sm text-gray-600">
                Complete KYC verification to unlock higher transaction limits.
              </p>
            )}
          </Card>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Profile;

import React from 'react';
import { Camera, CheckCircle2, Sparkles, Mail, Phone, MapPin } from 'lucide-react';
import { useProfile } from './ProfileContext';

export const ProfileHeroCard = ({ className = '' }) => {
  const {
    profile,
    currentAvatar,
    stats,
    headline,
    phone,
    location,
    handlePhotoUpload,
  } = useProfile();

  return (
    <div className={`bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
      {/* Cover Gradient Strip */}
      <div className="h-32 sm:h-40 2xl:h-52 3xl:h-64 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 relative">
        <div className="absolute top-0 right-0 w-96 h-full bg-blue-500/10 blur-2xl" />
        <div className="absolute top-4 2xl:top-6 right-4 2xl:right-6 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 2xl:gap-2 px-3 2xl:px-4 py-1 2xl:py-1.5 rounded-full text-xs 2xl:text-base font-bold bg-white/10 text-cyan-300 border border-white/20 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-cyan-300" />
            <span>{profile.department || 'Computer Science'} Portal</span>
          </span>
        </div>
      </div>

      {/* Profile Info Row with Overlapping Avatar */}
      <div className="px-6 2xl:px-10 pb-6 2xl:pb-10 pt-0 relative">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 2xl:gap-8 -mt-16 sm:-mt-20 2xl:-mt-28 3xl:-mt-32 mb-4 2xl:mb-6">
          {/* Avatar with Camera Overlay & Verification Badge */}
          <div className="relative group shrink-0">
            <img
              src={
                currentAvatar ||
                profile.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  profile.name || 'Candidate'
                )}&background=1e3a8a&color=fff&bold=true&size=256`
              }
              alt={profile.name}
              className="w-28 h-28 sm:w-32 sm:h-32 2xl:w-44 2xl:h-44 3xl:w-52 3xl:h-52 rounded-3xl object-cover border-4 2xl:border-6 border-white shadow-xl bg-slate-100"
            />
            {/* Online indicator */}
            <span className="absolute bottom-1 right-1 w-5 h-5 2xl:w-7 2xl:h-7 rounded-full bg-emerald-500 border-2 2xl:border-3 border-white shadow-xs" />

            {/* Upload photo trigger */}
            <label
              htmlFor="avatar-upload"
              className="absolute inset-0 rounded-3xl bg-slate-950/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity cursor-pointer backdrop-blur-2xs"
              title="Change Avatar Photo"
            >
              <Camera className="w-6 h-6 2xl:w-9 2xl:h-9 mb-1" />
              <span className="text-[10px] 2xl:text-xs font-bold">Change</span>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Match Index Metric Card */}
          <div className="flex items-center gap-3 2xl:gap-5">
            <div className="p-3.5 2xl:p-6 3xl:p-7 rounded-2xl 2xl:rounded-3xl bg-slate-50 border border-slate-200 text-center shrink-0">
              <span className="text-2xl 2xl:text-4xl 3xl:text-5xl font-black text-blue-600 block leading-tight">
                {stats.matchIndex || 88}%
              </span>
              <span className="text-[10px] 2xl:text-xs 3xl:text-sm text-slate-500 font-bold uppercase tracking-wider">
                AI Fit Score
              </span>
            </div>
            <div className="p-3.5 2xl:p-6 3xl:p-7 rounded-2xl 2xl:rounded-3xl bg-emerald-50 border border-emerald-200 text-center shrink-0">
              <span className="text-2xl 2xl:text-4xl 3xl:text-5xl font-black text-emerald-700 block leading-tight">
                {stats.profileCompletion || profile.stats?.profileCompletion || 92}%
              </span>
              <span className="text-[10px] 2xl:text-xs 3xl:text-sm text-emerald-800 font-bold uppercase tracking-wider">
                Profile Strength
              </span>
            </div>
          </div>
        </div>

        {/* Candidate Name, Title, and Verification */}
        <div className="space-y-1 2xl:space-y-2">
          <div className="flex items-center gap-2 2xl:gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl 2xl:text-4xl 3xl:text-5xl font-black text-slate-900">
              {profile.name}
            </h1>
            <span className="inline-flex items-center gap-1 2xl:gap-1.5 px-2.5 2xl:px-4 py-0.5 2xl:py-1 rounded-full text-xs 2xl:text-base font-bold bg-blue-50 text-blue-700 border border-blue-200">
              <CheckCircle2 className="w-3.5 h-3.5 2xl:w-5 2xl:h-5 text-blue-600" />
              <span>Verified Candidate</span>
            </span>
          </div>

          <p className="text-sm 2xl:text-lg 3xl:text-xl font-semibold text-slate-700">
            {headline}
          </p>

          <div className="flex items-center gap-4 2xl:gap-6 text-xs 2xl:text-base 3xl:text-lg text-slate-500 flex-wrap pt-1 2xl:pt-2">
            <span className="flex items-center gap-1.5 2xl:gap-2">
              <Mail className="w-3.5 h-3.5 2xl:w-5 2xl:h-5 text-slate-400" />
              {profile.email}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 2xl:gap-2">
              <Phone className="w-3.5 h-3.5 2xl:w-5 2xl:h-5 text-slate-400" />
              {phone}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 2xl:gap-2">
              <MapPin className="w-3.5 h-3.5 2xl:w-5 2xl:h-5 text-slate-400" />
              {location}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeroCard;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  User,
  Mail,
  Lock,
  GraduationCap,
  Award,
  Briefcase,
  Building2,
  ChevronDown,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { RegisterForm } from '../components/register/RegisterForm';
import { useRegisterMutation } from '../store/api/authApiSlice';
import { setCredentials } from '../store/slices/authSlice';

const ROLES = [
  { id: 'student', label: 'Student', icon: GraduationCap },
  { id: 'fresh_graduate', label: 'Graduate', icon: Award },
  { id: 'professional', label: 'Professional', icon: Briefcase },
  { id: 'employer', label: 'Employer', icon: Building2 },
];

const Register = () => {
  const [role, setRole] = useState('student');
  const [countryCode, setCountryCode] = useState('+92');
  const [skills, setSkills] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [registerUser, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddSkill = (newSkill) => {
    if (skills.length >= 15) {
      toast.error('Maximum 15 skills allowed.');
      return;
    }
    if (!skills.includes(newSkill)) {
      setSkills((prev) => [...prev, newSkill]);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills((prev) => prev.filter((s) => s !== skillToRemove));
  };

  const onSubmit = async (formData) => {
    const formattedPhone = formData.phone
      ? `${countryCode} ${formData.phone.trim().replace(/^0+/, '')}`
      : '';

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      role,
      phone: formattedPhone,
    };

    if (role === 'employer') {
      payload.companyProfile = {
        companyName: formData.companyName || formData.name,
        industry: formData.industry || 'Multi-Disciplinary',
      };
    } else {
      payload.headline = formData.headline?.trim() || '';
      payload.department = formData.department || 'Information Technology';
      payload.skills = skills;
    }

    try {
      const response = await registerUser(payload).unwrap();
      const user = response?.data?.user;
      const token = response?.data?.accessToken;

      if (user) {
        dispatch(setCredentials({ user, token }));
        toast.success(`Account created! Welcome, ${user.name}.`);
        if (user.role === 'employer') {
          navigate('/employer/dashboard');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      const apiErrorMsg =
        err?.data?.message ||
        (Array.isArray(err?.data?.errors) && err.data.errors[0]) ||
        err?.error ||
        'Registration failed. Please check your data.';
      toast.error(apiErrorMsg);
    }
  };

  return (
    <RegisterForm>
      <RegisterForm.LeftBanner />

      <RegisterForm.RightPanel>
        <RegisterForm.Header />

        <RegisterForm.RoleSelector
          value={role}
          onChange={setRole}
          roles={ROLES}
        />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 sm:space-y-2.5 2xl:space-y-3.5">
          {/* Row 1: Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 2xl:gap-3.5">
            <RegisterForm.Field
              label="Full Name"
              icon={User}
              placeholder="Enter your full name"
              registration={register('name', {
                required: 'Full name is required',
                minLength: {
                  value: 3,
                  message: 'Min 3 chars',
                },
              })}
              error={errors.name?.message}
              autoComplete="name"
            />

            <RegisterForm.Field
              label="Email Address"
              icon={Mail}
              type="email"
              placeholder="name@example.com"
              registration={register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email',
                },
              })}
              error={errors.email?.message}
              autoComplete="email"
            />
          </div>

          {/* Row 2: Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 2xl:gap-3.5">
            <RegisterForm.Field
              label="Password"
              icon={Lock}
              type="password"
              placeholder="Min 8 characters"
              registration={register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Min 8 chars',
                },
              })}
              error={errors.password?.message}
              autoComplete="new-password"
            />

            <RegisterForm.Field
              label="Confirm Password"
              icon={Lock}
              type="password"
              placeholder="Confirm password"
              registration={register('confirmPassword', {
                required: 'Please confirm password',
                minLength: {
                  value: 8,
                  message: 'Min 8 chars',
                },
                validate: (val) =>
                  val === watch('password') || 'Passwords do not match',
              })}
              error={errors.confirmPassword?.message}
              autoComplete="new-password"
            />
          </div>

          {/* Rows 3 & 4: Role Specific Fields */}
          {role === 'employer' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 2xl:gap-3.5 items-start">
              <RegisterForm.Field
                label="Company Name"
                icon={Building2}
                placeholder="e.g. TechCorp Solutions"
                registration={register('companyName', {
                  required: role === 'employer' ? 'Company name is required' : false,
                })}
                error={errors.companyName?.message}
              />

              <RegisterForm.Field
                label="Industry"
                icon={Briefcase}
                placeholder="e.g. Healthcare, Engineering, IT"
                registration={register('industry')}
                error={errors.industry?.message}
              />

              <RegisterForm.PhoneField
                label="Company Phone"
                countryCode={countryCode}
                onCountryCodeChange={setCountryCode}
                registration={register('phone', {
                  pattern: {
                    value: /^[0-9\s-]{7,15}$/,
                    message: 'Invalid phone number',
                  },
                })}
                error={errors.phone?.message}
              />

              <div className="space-y-0.5">
                <label className="block text-[10px] 2xl:text-xs font-semibold uppercase tracking-wider text-slate-600 mb-0.5">
                  Recruitment Scope
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <select
                    {...register('recruitmentScope')}
                    className="w-full bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 pl-8 pr-8 py-1.5 sm:py-2 cursor-pointer appearance-none"
                  >
                    <option value="National">🇵🇰 Domestic (Pakistan Nationwide)</option>
                    <option value="Hybrid">🌐 Hybrid / Remote Friendly</option>
                    <option value="Global">🌍 International / Global Placement</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-slate-400">
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 2xl:gap-3.5 items-start">
              <RegisterForm.Field
                label="Target Role / Headline"
                icon={Briefcase}
                placeholder="e.g. MERN Developer, Civil Engineer"
                registration={register('headline', {
                  required: role !== 'employer' ? 'Target role / headline is required' : false,
                  minLength: {
                    value: 3,
                    message: 'Min 3 chars',
                  },
                })}
                error={errors.headline?.message}
              />

              {/* Academic Discipline / Department */}
              <div className="space-y-0.5">
                <label className="block text-[10px] 2xl:text-xs font-semibold uppercase tracking-wider text-slate-600 mb-0.5">
                  Academic Discipline / Department
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <select
                    {...register('department')}
                    className="w-full bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 pl-8 pr-8 py-1.5 sm:py-2 cursor-pointer appearance-none"
                  >
                    <option value="Information Technology">💻 Computer Science & IT (Software, AI)</option>
                    <option value="Medical & Healthcare">🩺 Medical & Healthcare (Clinical, Pharmacy)</option>
                    <option value="Engineering & Construction">🏗️ Engineering & Construction (Civil, Mech)</option>
                    <option value="Business & Finance">📊 Business & Finance (Banking, Accounting)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-slate-400">
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>
              </div>

              <RegisterForm.PhoneField
                label="Phone Number"
                countryCode={countryCode}
                onCountryCodeChange={setCountryCode}
                registration={register('phone', {
                  pattern: {
                    value: /^[0-9\s-]{7,15}$/,
                    message: 'Invalid phone number',
                  },
                })}
                error={errors.phone?.message}
              />

              <RegisterForm.SkillPicker
                skills={skills}
                onAddSkill={handleAddSkill}
                onRemoveSkill={handleRemoveSkill}
                department={watch('department') || 'Information Technology'}
                label="Key Skills (Optional)"
              />
            </div>
          )}

          <RegisterForm.Submit loading={isLoading} />
        </form>

        <RegisterForm.Footer>
          <span>Already have an account?</span>
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Sign in
          </Link>
        </RegisterForm.Footer>
      </RegisterForm.RightPanel>
    </RegisterForm>
  );
};

export default Register;

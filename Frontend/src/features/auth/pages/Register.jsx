import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/useauth';

export default function Register() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const { handleRegister } = useAuth()

  const getPasswordScore = (val) => {
    if (!val || val.length === 0) return 0;
    let score = 0;
    if (val.length >= 6) score++;
    if (val.length >= 8 && /[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    return score;
  };

  const score = getPasswordScore(password);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-surface text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container min-h-screen flex flex-col lg:flex-row relative overflow-hidden">

      {/* Left Column: Form */}
      <div className="w-full lg:w-1/2 flex flex-col h-screen overflow-y-auto relative z-10 scrollbar-none [&::-webkit-scrollbar]:hidden">
        {/* Ambient Golden Radiance in Background for Mobile/Tablet */}
        <div className="absolute inset-0 ambient-glow pointer-events-none z-0 lg:hidden"></div>

        {/* Top Navigation Shell */}
        <header className="sticky top-0 z-30 bg-surface/80 backdrop-blur-md border-b border-outline-variant/20 dark:border-outline-variant/20 w-full">
          <div className="flex justify-between items-center w-full px-6 h-16">
            {/* <Link to="/" aria-label="Go back" className="text-primary dark:text-primary p-2 -ml-2 rounded-lg hover:bg-surface-container hover:text-primary-container transition-colors active:scale-95 duration-150 flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </Link> */}
            <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface tracking-tight lg:hidden">
              Snitch
            </h1>
            <Link to="/login" className="font-label-lg text-label-lg text-primary dark:text-primary font-semibold hover:text-primary-container transition-colors active:scale-95 duration-150">
              Sign In
            </Link>
          </div>
        </header>

        {/* Main Canvas Section */}
        <main className="relative z-10 w-full max-w-[480px] mx-auto px-6 py-6 lg:py-8 flex-1 flex flex-col justify-start">
          {/* Header Description / Identity Lead */}
          <div className="mb-10 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/30 mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-bold">Premium Access</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface tracking-tight mb-3">
              Begin your journey
            </h2>
            <p className="text-base text-on-surface-variant font-medium">
              Create your Snitch account for an exclusive shopping experience.
            </p>
          </div>

          {/* Registration Form */}
          <form
            className="space-y-5"
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                await handleRegister({
                  email: e.target.email.value,
                  contact: e.target.phone.value,
                  password: e.target.password.value,
                  fullName: e.target.name.value,
                  isSeller: e.target.is_seller.checked
                })

                navigate("/")
              } catch (error) {
                console.error("Registration failed:", error)
              }
            }}
          >
            {/* 1. Full Name Field */}
            <div className="space-y-2">
              <label className="block font-label-md text-label-md font-semibold text-on-surface-variant" htmlFor="full_name">
                Full Name
              </label>
              <div className="input-focus-glow relative flex items-center bg-surface-container-low rounded-xl border border-outline-variant/40 hover:border-outline-variant/80 transition-all duration-200 focus-within:border-primary/50 focus-within:bg-surface shadow-sm">
                <span className="material-symbols-outlined text-outline pl-4 pr-2 text-[22px] pointer-events-none select-none">person</span>
                <input className="w-full bg-transparent border-0 focus:ring-0 text-on-surface placeholder:text-outline/50 font-body-lg text-body-lg py-3.5 pr-4 pl-1 outline-none rounded-xl" id="full_name" name="name" placeholder="Julian Vance" required type="text" />
              </div>
            </div>

            {/* 2. Email Address Field */}
            <div className="space-y-2">
              <label className="block font-label-md text-label-md font-semibold text-on-surface-variant" htmlFor="email_address">
                Email Address
              </label>
              <div className="input-focus-glow relative flex items-center bg-surface-container-low rounded-xl border border-outline-variant/40 hover:border-outline-variant/80 transition-all duration-200 focus-within:border-primary/50 focus-within:bg-surface shadow-sm">
                <span className="material-symbols-outlined text-outline pl-4 pr-2 text-[22px] pointer-events-none select-none">mail</span>
                <input className="w-full bg-transparent border-0 focus:ring-0 text-on-surface placeholder:text-outline/50 font-body-lg text-body-lg py-3.5 pr-4 pl-1 outline-none rounded-xl" id="email_address" name="email" placeholder="julian.vance@executive.io" required type="email" />
              </div>
            </div>

            {/* 3. Contact Number */}
            <div className="space-y-2">
              <label className="block font-label-md text-label-md font-semibold text-on-surface-variant" htmlFor="phone_number">
                Contact Number
              </label>
              <div className="input-focus-glow relative flex items-center bg-surface-container-low rounded-xl border border-outline-variant/40 hover:border-outline-variant/80 transition-all duration-200 overflow-hidden focus-within:border-primary/50 focus-within:bg-surface shadow-sm">
                <div className="flex items-center pl-4 pr-2 py-3.5 border-r border-outline-variant/30 bg-surface-container-lowest/40 text-on-surface">
                  <span className="material-symbols-outlined text-outline text-[20px] mr-2">call</span>
                  <select aria-label="Country Code" className="bg-transparent border-0 focus:ring-0 text-on-surface font-label-lg text-label-lg p-0 cursor-pointer pr-5 outline-none font-medium" defaultValue="+91">
                    <option className="bg-surface-container text-on-surface" value="+91">+91 (IN)</option>
                    <option className="bg-surface-container text-on-surface" value="+1">+1 (US)</option>
                    <option className="bg-surface-container text-on-surface" value="+44">+44 (UK)</option>
                    <option className="bg-surface-container text-on-surface" value="+49">+49 (DE)</option>
                    <option className="bg-surface-container text-on-surface" value="+65">+65 (SG)</option>
                    <option className="bg-surface-container text-on-surface" value="+81">+81 (JP)</option>
                  </select>
                </div>
                <input className="w-full bg-transparent border-0 focus:ring-0 text-on-surface placeholder:text-outline/50 font-body-lg text-body-lg py-3.5 px-4 outline-none" id="phone_number" name="phone" placeholder="98765 43210" required type="tel" />
              </div>
            </div>

            {/* 4. Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block font-label-md text-label-md font-semibold text-on-surface-variant" htmlFor="user_password">
                  Password
                </label>
                <span className="font-label-sm text-label-sm text-outline font-medium">Min. 8 characters</span>
              </div>
              <div className="input-focus-glow relative flex items-center bg-surface-container-low rounded-xl border border-outline-variant/40 hover:border-outline-variant/80 transition-all duration-200 focus-within:border-primary/50 focus-within:bg-surface shadow-sm">
                <span className="material-symbols-outlined text-outline pl-4 pr-2 text-[22px] pointer-events-none select-none">lock</span>
                <input
                  className="w-full bg-transparent border-0 focus:ring-0 text-on-surface placeholder:text-outline/50 font-body-lg text-body-lg py-3.5 pr-12 pl-1 outline-none rounded-xl"
                  id="user_password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  type={showPassword ? "text" : "password"}
                />
                <button aria-label="Toggle password visibility" className="absolute right-3 text-outline hover:text-primary transition-colors flex items-center justify-center p-2 rounded-lg hover:bg-surface-container-highest" id="togglePasswordBtn" onClick={() => setShowPassword(!showPassword)} type="button">
                  <span className="material-symbols-outlined text-[22px]" id="pwdEyeIcon">{showPassword ? "visibility_off" : "visibility"}</span>
                </button>
              </div>
              {/* Segmented 4-bar Password Strength Indicator */}
              <div className="pt-2">
                <div className="grid grid-cols-4 gap-2 h-1.5">
                  <div className={`h-full rounded-full transition-all duration-500 ${score === 0 ? 'bg-surface-container-highest' : score === 1 ? 'bg-error' : score === 2 || score === 3 ? 'bg-[#f59e0b]' : 'bg-[#fbbf24] shadow-[0_0_10px_rgba(251,191,36,0.5)]'}`}></div>
                  <div className={`h-full rounded-full transition-all duration-500 ${score < 2 ? 'bg-surface-container-highest' : score === 2 || score === 3 ? 'bg-[#f59e0b]' : 'bg-[#fbbf24] shadow-[0_0_10px_rgba(251,191,36,0.5)]'}`}></div>
                  <div className={`h-full rounded-full transition-all duration-500 ${score < 3 ? 'bg-surface-container-highest' : score === 3 ? 'bg-[#fbbf24] shadow-[0_0_10px_rgba(251,191,36,0.5)]' : 'bg-[#fbbf24] shadow-[0_0_10px_rgba(251,191,36,0.5)]'}`}></div>
                  <div className={`h-full rounded-full transition-all duration-500 ${score < 4 ? 'bg-surface-container-highest' : 'bg-[#fbbf24] shadow-[0_0_10px_rgba(251,191,36,0.5)]'}`}></div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className={`font-label-sm text-label-sm font-medium ${score === 0 ? 'text-outline' : score === 1 ? 'text-error' : score === 2 ? 'text-secondary' : score === 3 ? 'text-primary' : 'text-primary font-bold'}`}>
                    {score === 0 ? 'Awaiting input...' : score === 1 ? 'Weak password' : score === 2 ? 'Fairly strong' : score === 3 ? 'Good password' : 'Excellent strength'}
                  </p>
                  <span className="font-label-sm text-label-sm text-outline flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[14px]">verified_user</span> Encrypted
                  </span>
                </div>
              </div>
            </div>

            {/* 5. 'isSeller' Flag Checkbox / Toggle Card */}
            <div className="pt-2">
              <label className="relative group cursor-pointer flex items-start gap-4 p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 hover:border-outline-variant/70 transition-all duration-300 shadow-sm hover:shadow-md" htmlFor="isSeller">
                <div className="pt-0.5">
                  <input className="w-5 h-5 rounded border-2 border-outline-variant/60 text-primary-container focus:ring-0 focus:ring-offset-0 bg-surface-container transition-all duration-200 cursor-pointer checked:bg-primary-container checked:border-primary-container" id="isSeller" name="is_seller" type="checkbox" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-base font-bold text-on-surface group-hover:text-primary transition-colors">
                      Register as a Seller
                    </span>
                    <span className="material-symbols-outlined text-primary-container text-[22px] bg-primary-container/10 p-1.5 rounded-lg">storefront</span>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed font-medium">
                    Unlock merchant tools, inventory management, and your personalized seller dashboard.
                  </p>
                </div>
              </label>
            </div>

            {/* Terms & Privacy */}
            <p className="text-sm text-outline/80 text-center px-4 pt-2 font-medium">
              By continuing, you agree to Snitch's
              <Link className="text-primary hover:text-primary-container hover:underline underline-offset-4 ml-1.5 transition-colors" to="/terms">Terms of Service</Link> &
              <Link className="text-primary hover:text-primary-container hover:underline underline-offset-4 ml-1.5 transition-colors" to="/privacy">Privacy Policy</Link>.
            </p>

            {/* Primary Action Button */}
            <div className="pt-3">
              <button className="w-full h-14 rounded-xl bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] hover:from-[#fcd34d] hover:to-[#fbbf24] active:scale-[0.98] text-[#09090b] text-lg font-bold text-center transition-all duration-200 shadow-[0_8px_20px_-6px_rgba(245,158,11,0.4)] hover:shadow-[0_12px_24px_-6px_rgba(245,158,11,0.5)] flex items-center justify-center gap-3 group" type="submit">
                <span>Create Account</span>
                <span className="material-symbols-outlined text-[22px] group-hover:translate-x-1.5 transition-transform font-bold">arrow_forward</span>
              </button>
            </div>
          </form>

          {/* Social Authentication */}
          <div className="mt-10">
            <div className="relative flex py-3 items-center">
              <div className="flex-grow border-t border-outline-variant/30"></div>
              <span className="flex-shrink mx-4 text-xs font-bold text-outline/70 uppercase tracking-widest">Or continue with</span>
              <div className="flex-grow border-t border-outline-variant/30"></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-5">
              <button className="h-12 rounded-xl bg-surface-container-lowest border border-outline-variant/40 hover:border-outline-variant/80 hover:bg-surface-container text-on-surface font-semibold flex items-center justify-center gap-3 transition-all duration-200 active:scale-95 shadow-sm" type="button">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"></path>
                </svg>
                <span>Google</span>
              </button>
              <button className="h-12 rounded-xl bg-surface-container-lowest border border-outline-variant/40 hover:border-outline-variant/80 hover:bg-surface-container text-on-surface font-semibold flex items-center justify-center gap-3 transition-all duration-200 active:scale-95 shadow-sm" type="button">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.45c.61-.75 1.04-1.8 0.92-2.85-.92.04-2.02.62-2.67 1.37-.58.66-1.1 1.73-.96 2.76 1.03.08 2.09-.53 2.71-1.28z"></path>
                </svg>
                <span>Apple</span>
              </button>
            </div>
          </div>

          {/* Secondary Navigation */}
          <div className="mt-10 mb-6 text-center">
            <p className="text-base text-on-surface-variant font-medium">
              Already have an account?
              <Link className="text-primary font-bold hover:text-primary-container transition-colors inline-flex items-center gap-1 active:scale-95 ml-2" to="/signin">
                <span>Sign In</span>
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </Link>
            </p>
          </div>
        </main>
      </div>

      {/* Right Column: Aesthetic Visual (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-surface-container-high overflow-hidden items-center justify-center border-l border-outline-variant/10 shadow-2xl">
        {/* Deep ambient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-surface-container-high via-surface-container to-surface opacity-90"></div>

        {/* Abstract decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#fbbf24] rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#f59e0b] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

        {/* Dynamic geometric accents */}
        <div className="absolute top-10 right-10 w-32 h-32 border border-[#fbbf24]/20 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 border border-[#f59e0b]/10 rounded-full"></div>

        {/* Content */}
        <div className="relative z-10 p-12 max-w-lg text-center flex flex-col items-center">
          <div className="w-24 h-24 mb-10 rounded-2xl bg-gradient-to-br from-[#fbbf24] to-[#d97706] shadow-[0_0_50px_rgba(245,158,11,0.5)] flex items-center justify-center transform rotate-3 hover:rotate-6 transition-transform duration-500">
            <span className="material-symbols-outlined text-[48px] text-[#09090b]">diamond</span>
          </div>

          <h2 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-on-surface mb-6 leading-tight">
            Elevate Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-[#f59e0b]">Wardrobe.</span>
          </h2>

          <p className="text-lg xl:text-xl text-on-surface-variant font-medium leading-relaxed mb-12 max-w-md">
            Join Snitch to discover premium collections, exclusive offers, and a personalized shopping experience tailored for the modern aesthetic.
          </p>

          <div className="flex items-center gap-5 bg-surface-container/50 backdrop-blur-sm py-3 px-6 rounded-full border border-outline-variant/20 shadow-lg">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-surface-container-high bg-surface-container flex items-center justify-center overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}&backgroundColor=transparent`} alt="User" className="w-full h-full object-cover opacity-80" />
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1 text-[#fbbf24] mb-0.5">
                {[1, 2, 3, 4, 5].map(star => <span key={star} className="material-symbols-outlined text-[14px] fill-current">star</span>)}
              </div>
              <p className="text-sm text-on-surface-variant font-semibold">Over <span className="text-on-surface">100k+</span> fashion enthusiasts</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

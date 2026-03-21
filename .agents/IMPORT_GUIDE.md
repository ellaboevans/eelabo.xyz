# Import Guide - Using the Decoupled Components

## Quick Reference

### Using Hooks

```typescript
import {
  useAuthState,
  useAuthHandlers,
  useSessionState,
  useSessionHandlers,
  useProviderConfig,
  type AuthUser,
  type ProviderConfig,
} from "@/lib/hooks";
```

### Using Auth Components

```typescript
import { AuthContainer } from "@/components/auth/auth-container";
import { LoginForm } from "@/components/auth/login-form";
import { PasswordResetForm } from "@/components/auth/password-reset-form";
import { PasswordConfirmForm } from "@/components/auth/password-confirm-form";
import { VerificationForm } from "@/components/auth/verification-form";
```

### Using Console Components

```typescript
import { ConsoleHeader } from "@/components/console/console-header";
import { SessionSetupPanel } from "@/components/console/session-setup-panel";
import { LastPayloadCard } from "@/components/console/last-payload-card";
```

## Usage Patterns

### Pattern 1: Using Auth Container (Recommended)

```typescript
"use client";

import { useState } from "react";
import { AuthContainer } from "@/components/auth/auth-container";
import type { AuthUser } from "@/lib/hooks";

export default function MyPage() {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  if (!authUser) {
    return (
      <AuthContainer
        onAuthSuccess={(user) => {
          setAuthUser(user);
        }}
      />
    );
  }

  return <div>Welcome, {authUser.email}!</div>;
}
```

### Pattern 2: Using Hooks Directly

```typescript
"use client";

import { useAuthState, useAuthHandlers } from "@/lib/hooks";
import { LoginForm } from "@/components/auth/login-form";

export default function CustomAuthFlow() {
  const authState = useAuthState();
  const handlers = useAuthHandlers({
    authEmail: authState.authEmail,
    authPassword: authState.authPassword,
    authMode: authState.authMode,
    authUser: authState.authUser,
    // ... other required props
    setAuthUser: authState.setAuthUser,
    setAuthError: authState.setAuthError,
    // ... other setters
  });

  return (
    <LoginForm
      authEmail={authState.authEmail}
      authPassword={authState.authPassword}
      authMode={authState.authMode}
      authBusy={authState.authBusy}
      authError={authState.authError}
      onSubmit={handlers.submitAuth}
      onChangeEmail={authState.setAuthEmail}
      onChangePassword={authState.setAuthPassword}
      onToggleMode={() => {
        authState.setAuthMode((m) =>
          m === "login" ? "signup" : "login"
        );
      }}
      onForgotPassword={() => {
        authState.setAuthStep("forgot");
      }}
    />
  );
}
```

### Pattern 3: Using Session Hooks

```typescript
"use client";

import {
  useSessionState,
  useSessionHandlers,
  useProviderConfig,
} from "@/lib/hooks";
import { SessionSetupPanel } from "@/components/console/session-setup-panel";

export default function MyConsole() {
  const sessionState = useSessionState();

  const providerConfig = useProviderConfig({
    providerName: sessionState.providerName,
    requestTemplate: sessionState.requestTemplate,
    transportType: sessionState.transportType,
    responseFormat: sessionState.responseFormat,
    responsePath: sessionState.responsePath,
    conPrefix: sessionState.conPrefix,
    endPrefix: sessionState.endPrefix,
    sessionActive: sessionState.sessionActive,
    caseSensitive: sessionState.caseSensitive,
  });

  const { handleStartSession } = useSessionHandlers({
    session: sessionState.session,
    draftInput: sessionState.draftInput,
    msisdn: sessionState.msisdn,
    serviceCode: sessionState.serviceCode,
    endpointUrl: sessionState.endpointUrl,
    useLiveEndpoint: sessionState.useLiveEndpoint,
    simulatedMessage: sessionState.simulatedMessage,
    providerConfig,
    setSession: sessionState.setSession,
    setLastPayload: sessionState.setLastPayload,
    setDraftInput: sessionState.setDraftInput,
    setError: sessionState.setError,
    setNotice: sessionState.setNotice,
    setIsStarting: sessionState.setIsStarting,
    setIsSending: sessionState.setIsSending,
  });

  return (
    <SessionSetupPanel
      endpointUrl={sessionState.endpointUrl}
      // ... other props
      onStartSession={handleStartSession}
    />
  );
}
```

## State Structure Reference

### useAuthState Output

```typescript
{
  // User object
  authUser: AuthUser | null,
  setAuthUser: (user: AuthUser | null) => void,
  
  // Loading state
  authLoading: boolean,
  setAuthLoading: (loading: boolean) => void,
  
  // UI mode
  authMode: "login" | "signup",
  setAuthMode: (mode: AuthMode) => void,
  
  // Current flow step
  authStep: "auth" | "forgot" | "reset",
  setAuthStep: (step: AuthStep) => void,
  
  // Form fields
  authEmail: string,
  setAuthEmail: (email: string) => void,
  authPassword: string,
  setAuthPassword: (password: string) => void,
  
  // Feedback
  authError: string | null,
  setAuthError: (error: string | null) => void,
  authNotice: string | null,
  setAuthNotice: (notice: string | null) => void,
  
  // Loading indicator
  authBusy: boolean,
  setAuthBusy: (busy: boolean) => void,
  
  // Password reset
  resetToken: string,
  setResetToken: (token: string) => void,
  resetPassword: string,
  setResetPassword: (password: string) => void,
  
  // Verification
  verificationCode: string,
  setVerificationCode: (code: string) => void,
}
```

### useSessionState Output

```typescript
{
  // Configuration
  endpointUrl: string,
  setEndpointUrl: (url: string) => void,
  selectedPresetId: string,
  setSelectedPresetId: (id: string) => void,
  providerName: string,
  setProviderName: (name: string) => void,
  useLiveEndpoint: boolean,
  setUseLiveEndpoint: (use: boolean) => void,
  
  // Transport & template
  transportType: "json" | "form" | "query",
  setTransportType: (type: TransportType) => void,
  requestTemplate: string,
  setRequestTemplate: (template: string) => void,
  
  // Session parameters
  msisdn: string,
  setMsisdn: (msisdn: string) => void,
  serviceCode: string,
  setServiceCode: (code: string) => void,
  
  // User input
  draftInput: string,
  setDraftInput: (input: string) => void,
  simulatedMessage: string,
  setSimulatedMessage: (message: string) => void,
  
  // Response parsing
  sessionActive: boolean,
  setSessionActive: (active: boolean) => void,
  responseFormat: "text" | "json",
  setResponseFormat: (format: "text" | "json") => void,
  responsePath: string,
  setResponsePath: (path: string) => void,
  conPrefix: string,
  setConPrefix: (prefix: string) => void,
  endPrefix: string,
  setEndPrefix: (prefix: string) => void,
  caseSensitive: boolean,
  setCaseSensitive: (sensitive: boolean) => void,
  
  // Session data
  session: Session | null,
  setSession: (session: Session | null) => void,
  lastPayload: string,
  setLastPayload: (payload: string) => void,
  
  // Feedback
  error: string | null,
  setError: (error: string | null) => void,
  notice: string | null,
  setNotice: (notice: string | null) => void,
  
  // Loading indicators
  isStarting: boolean,
  setIsStarting: (starting: boolean) => void,
  isSending: boolean,
  setIsSending: (sending: boolean) => void,
}
```

### useSessionHandlers Output

```typescript
{
  // Start a new USSD session
  handleStartSession: (event: SyntheticEvent) => Promise<void>,
  
  // Send interaction to active session
  sendInteraction: () => Promise<void>,
  
  // Copy session ID to clipboard
  handleCopySessionId: (value: string) => Promise<void>,
}
```

## Component Props Reference

### AuthContainer Props

```typescript
interface AuthContainerProps {
  onAuthSuccess: (user: AuthUser) => void;
}
```

### LoginForm Props

```typescript
interface LoginFormProps {
  authEmail: string;
  authPassword: string;
  authMode: AuthMode;
  authBusy: boolean;
  authError: string | null;
  onSubmit: (e: SyntheticEvent) => void;
  onChangeEmail: (email: string) => void;
  onChangePassword: (password: string) => void;
  onToggleMode: () => void;
  onForgotPassword: () => void;
}
```

### SessionSetupPanel Props

```typescript
interface SessionSetupPanelProps {
  endpointUrl: string;
  selectedPresetId: string;
  providerPresets: Array<{ id: string; name: string }>;
  providerName: string;
  msisdn: string;
  serviceCode: string;
  transportType: TransportType;
  requestTemplate: string;
  responseFormat: "text" | "json";
  responsePath: string;
  conPrefix: string;
  endPrefix: string;
  caseSensitive: boolean;
  sessionActive: boolean;
  simulatedMessage: string;
  useLiveEndpoint: boolean;
  isStarting: boolean;
  templateExamples: TemplateExample[];
  
  // Callbacks
  onEndpointUrlChange: (url: string) => void;
  onPresetChange: (id: string) => void;
  onProviderNameChange: (name: string) => void;
  onMsisdnChange: (msisdn: string) => void;
  onServiceCodeChange: (code: string) => void;
  onTransportTypeChange: (type: TransportType) => void;
  onRequestTemplateChange: (template: string) => void;
  onResponseFormatChange: (format: "text" | "json") => void;
  onResponsePathChange: (path: string) => void;
  onConPrefixChange: (prefix: string) => void;
  onEndPrefixChange: (prefix: string) => void;
  onCaseSensitiveChange: (sensitive: boolean) => void;
  onSessionActiveChange: (active: boolean) => void;
  onSimulatedMessageChange: (message: string) => void;
  onUseLiveEndpointChange: (useLive: boolean) => void;
  onApplyTemplateExample: (example: TemplateExample) => void;
  onStartSession: (event: SyntheticEvent) => void;
}
```

## Common Mistakes to Avoid

### ❌ Don't: Create new instances in render

```typescript
// BAD: Creates new hook instances each render
export default function Page() {
  const authState = useAuthState();
  const handlers = useAuthHandlers(authState);
  return <Component handlers={handlers} />;
}
```

### ✓ Do: Create once, reuse references

```typescript
// GOOD: State and handlers persists across renders
export default function Page() {
  const authState = useAuthState();
  const handlers = useAuthHandlers(authState);
  return <Component handlers={handlers} />;
}
```

### ❌ Don't: Use hooks conditionally

```typescript
// BAD: Violates rules of hooks
if (condition) {
  const authState = useAuthState();
}
```

### ✓ Do: Use hooks at top level

```typescript
// GOOD: Hooks at component top level
const authState = useAuthState();
if (condition) {
  // Use authState inside
}
```

## Debugging Tips

### Check Hook State
```typescript
const authState = useAuthState();
console.log("Auth state:", authState);
```

### Check Handler Execution
```typescript
const handlers = useAuthHandlers({...});
console.log("About to call submitAuth");
handlers.submitAuth(event);
console.log("submitAuth called");
```

### Verify Component Props
```typescript
<SessionSetupPanel
  {...props}
  // Add debugging callback
  onEndpointUrlChange={(url) => {
    console.log("Endpoint changed to:", url);
    props.onEndpointUrlChange(url);
  }}
/>
```

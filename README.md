# IdentityServer4 Quicker Quickstart - An implementation of the Quickstart UI

# Introduction
As the name suggests, this project is an implementation of the [IdentityServer4 Quickstart UI](https://github.com/IdentityServer/IdentityServer4.Quickstart.UI) with much of the initial boilerplate and configuration already taken care of.  It's intended as an implementation of the Quickstart UI which is already functional as a demo application out-of-the-box with no configuration necessary and which can be quickly adapted for specific implementations by just providing the implementation-specific logic and configuration.

I loosely followed [this](https://www.scottbrady91.com/Identity-Server/Getting-Started-with-IdentityServer-4) guide with a new .NET Core 2.1 web application, up to and excluding persistent grant stores and ASP.NET Core Identity, because I'm considering those to be implementation-specific details.

# Customizations
In addition to using .NET Core 2.1 (which is the latest as of the writing of this readme), the following boilerplate is also already implemented:
* CORS: just add your domains to AllowedCorsOrigins in appsettings.json
* Serilog is already implemented and configured with the console sink and rolling file sync.  Beyond that, just install and configure your favorite Serilog sinks and you're already set.
* Integration with the [IdentityServer Demo](https://demo.identityserver.io/) as an external IDP for demo purposes.  Just swap this with your preferred external IDPs or remove it entirely if you prefer.
* Generic ProfileService which automatically adds to the access & id token all of the claims passed by the external IDP for scopes requested by and allowed for the client (as determined by IdentityServer via context.RequestedClaimTypes).
* A working test client configuration is provided for an Angular application (such as [OIDC Test Client](https://github.com/pfbrowning/oidc-test-client)) running on http://localhost:4200 and using implicit flow.

# Implementation-Specific Logic
Following are the obvious things that you'll want to consider implementing if you're using quicker-quickstart as a starting point, based on your needs & requirements:
* You'll probably want a persistent store for users and grants, whether you choose to use SQL Server or a different data store.  If you choose to use SQL Server with ASP.NET Core Identity, then [this](https://www.scottbrady91.com/Identity-Server/Getting-Started-with-IdentityServer-4) is a good starting point.
* Unless you want your users to log in as Alice or Bob, you should remove the in-memory test users.
* Implement your local login logic or disable local login on the client configuration.
* Configure any external identity providers in Startup.cs
* Consider implementing your own logic in ProfileService, or at the very least review what's already happening to see if it meets your needs.  This is where you would put any custom logic for retrieving user data and populating the claims for the access token and id token.
* Configure a proper [signing credential](http://amilspage.com/signing-certificates-idsv4/) so that generated tokens aren't invalidated on each restart of your IdentityServer4 instance.

# Usage
identityserver4-quicker-quickstart works out-of-the-box with no configuration necessary if you're using it alongside [OIDC Test Client](https://github.com/pfbrowning/oidc-test-client), although you can obviously use it for any OIDC-compliant application once configured accordingly.  In order to use it as a demo, simply do the following:
1. Install the .NET Core 2.1 CLI, if you haven't already.
2. Clone the repo.
3. Modify the configuration to your liking, or just run with it as-is if you're using [OIDC Test Client](https://github.com/pfbrowning/oidc-test-client).
3. Run `dotnet restore`, `dotnet build`, and then `dotnet run`.  Alternatively if you're using VS Code you can also use the included debuging profile to use VS Code debugging in place of `dotnet run` if you prefer.
4. Start up and / or connect to your OpenID Connect application and initate your login via implicit flow (unless you've configured it another way).  You can use the internal login using the test users "alice" / "password" and "bob" / "password", or use the demo external login which works similarly.
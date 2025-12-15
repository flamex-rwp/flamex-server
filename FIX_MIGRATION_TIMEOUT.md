# Fix Migration Timeout Issue

## Problem
Neon connection pooler doesn't support Prisma advisory locks needed for migrations.

## Solutions

### Solution 1: Use Direct Connection (Recommended)

**For Neon, you need TWO connection strings:**
1. **Pooler URL** (for application): `postgresql://...pooler.neon.tech`
2. **Direct URL** (for migrations): `postgresql://...neon.tech` (without `-pooler`)

**Steps:**

1. **Get your direct connection string from Neon dashboard:**
   - Go to your Neon project dashboard
   - Find the connection string WITHOUT `-pooler` in the hostname
   - It should look like: `postgresql://user:pass@ep-xxx-xxx.neon.tech/neondb`

2. **Temporarily use direct connection for migration:**

   **Option A: Set environment variable temporarily**
   ```powershell
   # In PowerShell, set direct connection temporarily
   $env:DATABASE_URL="postgresql://user:pass@ep-xxx-xxx.neon.tech/neondb?sslmode=require"
   
   # Then run migration
   npx prisma migrate dev --name add_takeaway_table_and_google_maps_link
   
   # Or use deploy for production
   npx prisma migrate deploy
   ```

   **Option B: Create .env.migration file**
   ```bash
   # Create .env.migration with direct connection
   DATABASE_URL="postgresql://user:pass@ep-xxx-xxx.neon.tech/neondb?sslmode=require"
   ```
   
   Then run:
   ```powershell
   # Load the migration env file
   Get-Content .env.migration | ForEach-Object { if ($_ -match '^([^=]+)=(.*)$') { [Environment]::SetEnvironmentVariable($matches[1], $matches[2], 'Process') } }
   
   npx prisma migrate deploy
   ```

### Solution 2: Increase Timeout

Add timeout parameter to your DATABASE_URL:
```powershell
$env:DATABASE_URL="your-connection-string?connect_timeout=30&pool_timeout=30"
npx prisma migrate deploy
```

### Solution 3: Stop Server First

If your server is running, it might be holding connections:
```powershell
# Stop your server first
# Then run migration
npx prisma migrate deploy
```

### Solution 4: Use Migrate Deploy (Production)

For production/online servers, always use `migrate deploy`:
```powershell
npx prisma migrate deploy
```

This is better than `migrate dev` for production because:
- It doesn't create migration files
- It applies existing migrations
- It's safer for production

## Recommended Steps for Your Case:

```powershell
# 1. Stop your server if running
# (Ctrl+C or pm2 stop)

# 2. Get direct connection string from Neon dashboard
# (Copy the one WITHOUT -pooler)

# 3. Set it temporarily
$env:DATABASE_URL="your-direct-connection-string-here"

# 4. Run migration
npx prisma migrate deploy

# 5. Regenerate Prisma client
npx prisma generate

# 6. Restart server with pooler connection
# (Your .env should have pooler URL for normal operation)
```

## Verify Connection:

Test your connection first:
```powershell
npx prisma db pull
```

If this works, migrations will work too.


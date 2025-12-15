# Migration Steps for Schema Changes

## Changes Made:
1. Changed `tableNumber` from `Int?` to `String?` in Order model
2. Added `googleMapsLink` field to CustomerAddress model

## Steps to Apply Changes:

### Step 1: Navigate to Server Directory
```bash
cd flamex-server
```

### Step 2: Create and Apply Migration

**For Production/Online Server (Recommended):**
```bash
# Create migration with a descriptive name
npx prisma migrate dev --name add_takeaway_table_and_google_maps_link

# Or if you want to deploy directly without creating migration file first:
npx prisma migrate deploy
```

**For Development (if testing locally first):**
```bash
# This will create migration files and apply them
npm run prisma:migrate
# or
npx prisma migrate dev --name add_takeaway_table_and_google_maps_link
```

### Step 3: Regenerate Prisma Client
```bash
npm run prisma:generate
# or
npx prisma generate
```

### Step 4: Restart Server
```bash
# If using PM2 or similar process manager:
pm2 restart flamex-server

# If running directly:
# Stop current server (Ctrl+C) and restart:
npm run start
# or for development:
npm run dev
```

## Important Notes:

⚠️ **Data Migration Warning:**
- The `tableNumber` field is changing from Integer to String
- Existing numeric table numbers (1-9) will be automatically converted to strings
- If you have table number 10 in the database, you may want to update it to "takeaway" manually:
  ```sql
  UPDATE orders SET table_number = 'takeaway' WHERE table_number = '10';
  ```

## Verify Migration:

After migration, verify the changes:
```bash
# Open Prisma Studio to check the database
npm run prisma:studio
```

Or check directly in your database:
```sql
-- Check Order table structure
\d orders

-- Check CustomerAddress table structure  
\d customer_addresses
```

## Rollback (if needed):

If you need to rollback:
```bash
# This will reset the database (WARNING: deletes all data)
npm run prisma:reset

# Or manually rollback the migration
npx prisma migrate resolve --rolled-back <migration_name>
```


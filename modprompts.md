modprompts.md

# PromptStack - User Moderation & Permissions Research

## Overview

Research on implementing user permissions to allow logged-in users to edit and delete only their own prompt submissions.

## Current Authentication System

### Clerk Integration

- **Authentication Provider**: Clerk is integrated for user management
- **User Identity**: Available through `ctx.auth.getUserIdentity()` in Convex functions
- **User Data**: Returns user ID, name, email, and other profile information

### Current Prompt Schema

```typescript
// convex/schema.ts
prompts: defineTable({
  title: v.string(),
  description: v.string(),
  prompt: v.string(),
  tags: v.array(v.string()),
  category: v.string(),
  slug: v.string(),
  likes: v.number(),
  views: v.number(),
  featured: v.boolean(),
  // Missing: authorId field for ownership tracking
});
```

## Required Implementation Changes

### 1. Schema Updates

**Add Author Tracking to Prompts Table:**

```typescript
// convex/schema.ts - Updated prompts table
prompts: defineTable({
  title: v.string(),
  description: v.string(),
  prompt: v.string(),
  tags: v.array(v.string()),
  category: v.string(),
  slug: v.string(),
  likes: v.number(),
  views: v.number(),
  featured: v.boolean(),
  authorId: v.string(), // Add this field to track prompt owner
  createdAt: v.number(), // Optional: track creation time
})
  .index("by_author", ["authorId"]) // Index for efficient author queries
  .index("by_slug", ["slug"]);
```

### 2. Backend Functions (Convex)

**Update Create Prompt Function:**

```typescript
// convex/prompts.ts - Modified createPrompt
export const createPrompt = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    prompt: v.string(),
    tags: v.array(v.string()),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    // Get authenticated user
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Must be logged in to create prompts");
    }

    const slug = generateSlug(args.title);

    return await ctx.db.insert("prompts", {
      ...args,
      slug,
      authorId: identity.subject, // Store user ID as author
      likes: 0,
      views: 0,
      featured: false,
      createdAt: Date.now(),
    });
  },
});
```

**Add Update Prompt Function:**

```typescript
// convex/prompts.ts - New updatePrompt function
export const updatePrompt = mutation({
  args: {
    id: v.id("prompts"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    prompt: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Must be logged in to edit prompts");
    }

    // Get the existing prompt
    const existingPrompt = await ctx.db.get(args.id);
    if (!existingPrompt) {
      throw new Error("Prompt not found");
    }

    // Check ownership
    if (existingPrompt.authorId !== identity.subject) {
      throw new Error("You can only edit your own prompts");
    }

    // Update the prompt
    const { id, ...updateData } = args;
    await ctx.db.patch(args.id, updateData);
  },
});
```

**Add Delete Prompt Function:**

```typescript
// convex/prompts.ts - New deletePrompt function
export const deletePrompt = mutation({
  args: {
    id: v.id("prompts"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Must be logged in to delete prompts");
    }

    // Get the existing prompt
    const existingPrompt = await ctx.db.get(args.id);
    if (!existingPrompt) {
      throw new Error("Prompt not found");
    }

    // Check ownership
    if (existingPrompt.authorId !== identity.subject) {
      throw new Error("You can only delete your own prompts");
    }

    // Delete the prompt
    await ctx.db.delete(args.id);
  },
});
```

**Add User's Prompts Query:**

```typescript
// convex/prompts.ts - Query user's own prompts
export const getUserPrompts = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    return await ctx.db
      .query("prompts")
      .withIndex("by_author", (q) => q.eq("authorId", identity.subject))
      .order("desc")
      .collect();
  },
});
```

### 3. Frontend Components

**Add Edit/Delete Buttons to Prompt Display:**

```typescript
// src/components/PromptActions.tsx - New component
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

interface PromptActionsProps {
  prompt: {
    _id: string;
    authorId: string;
    title: string;
    // ... other prompt fields
  };
}

export function PromptActions({ prompt }: PromptActionsProps) {
  const { user } = useUser();
  const deletePrompt = useMutation(api.prompts.deletePrompt);

  // Only show actions if user owns this prompt
  if (!user || user.id !== prompt.authorId) {
    return null;
  }

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this prompt?")) {
      await deletePrompt({ id: prompt._id });
    }
  };

  return (
    <div className="flex gap-2 mt-4">
      <button
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => {/* Navigate to edit form */}}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}
```

**Edit Form Component:**

```typescript
// src/components/EditPromptForm.tsx - New component
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

interface EditPromptFormProps {
  promptId: string;
  onSuccess?: () => void;
}

export function EditPromptForm({ promptId, onSuccess }: EditPromptFormProps) {
  const prompt = useQuery(api.prompts.getPromptById, { id: promptId });
  const updatePrompt = useMutation(api.prompts.updatePrompt);

  const [formData, setFormData] = useState({
    title: prompt?.title || "",
    description: prompt?.description || "",
    prompt: prompt?.prompt || "",
    tags: prompt?.tags || [],
    category: prompt?.category || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePrompt({
        id: promptId,
        ...formData,
      });
      onSuccess?.();
    } catch (error) {
      console.error("Failed to update prompt:", error);
    }
  };

  if (!prompt) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Form fields similar to AddNew component */}
      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        placeholder="Prompt Title"
        className="w-full p-2 border rounded"
      />
      {/* Add other form fields */}
      <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
        Update Prompt
      </button>
    </form>
  );
}
```

### 4. Route Updates

**Add Edit Route:**

```typescript
// src/routes/edit.$promptId.tsx - New edit route
import { createFileRoute } from '@tanstack/react-router';
import { EditPromptForm } from '../components/EditPromptForm';

export const Route = createFileRoute('/edit/$promptId')({
  component: EditPrompt,
});

function EditPrompt() {
  const { promptId } = Route.useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Prompt</h1>
      <EditPromptForm
        promptId={promptId}
        onSuccess={() => {
          // Navigate back to prompt or user dashboard
        }}
      />
    </div>
  );
}
```

## Implementation Steps

### Phase 1: Database Migration

1. **Update Schema**: Add `authorId` field to prompts table
2. **Data Migration**: Update existing prompts with author information (if possible)
3. **Add Indexes**: Create index for efficient author queries

### Phase 2: Backend Functions

1. **Modify createPrompt**: Add author tracking
2. **Add updatePrompt**: With ownership validation
3. **Add deletePrompt**: With ownership validation
4. **Add getUserPrompts**: Query user's own prompts

### Phase 3: Frontend Implementation

1. **Create PromptActions**: Edit/Delete buttons component
2. **Create EditPromptForm**: Form for editing prompts
3. **Add Edit Route**: New route for editing
4. **Update Prompt Display**: Show actions for owned prompts

### Phase 4: User Experience

1. **User Dashboard**: Show user's own prompts
2. **Confirmation Dialogs**: For delete actions
3. **Error Handling**: User-friendly error messages
4. **Loading States**: During edit/delete operations

## Security Considerations

### Authorization Checks

- **Server-side Validation**: Always verify ownership in Convex functions
- **Client-side UI**: Hide actions for non-owners (UX only, not security)
- **Error Messages**: Don't reveal existence of prompts user can't access

### Data Integrity

- **Atomic Operations**: Use Convex transactions for complex updates
- **Validation**: Validate all input data
- **Audit Trail**: Consider logging edit/delete actions

## Testing Strategy

### Unit Tests

- Test ownership validation logic
- Test edit/delete functions with different user scenarios
- Test error handling for unauthorized access

### Integration Tests

- Test complete edit workflow
- Test delete workflow with confirmation
- Test user dashboard functionality

## Future Enhancements

### Advanced Permissions

- **Admin Override**: Allow admins to edit/delete any prompt
- **Collaboration**: Allow multiple authors per prompt
- **Moderation**: Flag inappropriate content

### User Experience

- **Bulk Operations**: Select multiple prompts for deletion
- **Version History**: Track prompt edit history
- **Draft Mode**: Save drafts before publishing

## Migration Notes

### Existing Data

- Current prompts don't have `authorId` field
- Need strategy for assigning ownership to existing prompts
- Consider marking old prompts as "legacy" or "community"

### Backward Compatibility

- Ensure existing functionality continues to work
- Graceful handling of prompts without authors
- Update all queries to handle new schema

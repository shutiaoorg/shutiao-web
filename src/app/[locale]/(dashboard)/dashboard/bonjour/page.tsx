'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

export default function ProfilePage() {
  const t = useTranslations('dashboard.claim-link')
  const [isLoading, setIsLoading] = useState(false)

  const claimLinkSchema = z.object({
    uniqueId: z
      .string()
      .min(1, { message: t('required') })
      .min(3, { message: t('min-length') })
      .max(30, { message: t('max-length') })
      .regex(/^[a-z0-9-]+$/, { message: t('invalid') }),
  })

  type ClaimLinkFormData = z.infer<typeof claimLinkSchema>

  const form = useForm<ClaimLinkFormData>({
    resolver: zodResolver(claimLinkSchema),
    defaultValues: {
      uniqueId: '',
    },
  })

  const onSubmit = async (formData: ClaimLinkFormData) => {
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      void formData
      toast.success(t('success'))
    } catch (error) {
      form.setError('root', {
        message: error instanceof Error ? error.message : t('taken'),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex h-full w-full items-center justify-center'>
      <div className='mx-auto flex w-full max-w-2xl flex-col gap-12 px-4'>
        <div className='flex flex-col gap-3 text-center'>
          <p className='text-xl'>{t('greeting')}</p>
          <h1 className='font-bold text-5xl tracking-tight'>{t('title')}</h1>
          <p className='text-muted-foreground text-sm'>{t('subtitle')}</p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-4'
          >
            <FormField
              control={form.control}
              name='uniqueId'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className='relative'>
                      <span className='-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 text-muted-foreground text-sm'>
                        {t('prefix')}
                      </span>
                      <Input
                        type='text'
                        placeholder={t('placeholder')}
                        className={cn('h-12 pr-3 pl-24 text-base')}
                        autoComplete='off'
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9-]/g, '')
                          field.onChange(value)
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.formState.errors.root && (
              <p className='text-destructive text-sm'>
                {form.formState.errors.root.message}
              </p>
            )}

            <Button
              type='submit'
              className='h-12 w-full'
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner className='mr-2' />
                  {t('validating')}
                </>
              ) : (
                t('button')
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

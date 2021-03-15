import { AxiosError } from 'axios';
import { useHistory } from 'react-router';
import { useMutation, useQueryClient } from 'react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { notify } from '@r2/components/Notifications';
import { Checkbox } from '@r2/components/Checkbox';
import { Button, BackButton } from '@r2/components/Button';
import { TextField, Textarea } from '@r2/components/Fields';

import { createCommunity } from './service';

const formSchema = z.object({
  code: z
    .string()
    .min(2, 'O código deve ter no mínimo 2 caracteres')
    .max(48, 'O código não pode ter mais que 48 caracteres')
    .regex(/^[a-zA-Z0-9-_]+$/, 'O código só pode conter letras, números, traços e underlines'),
  title: z
    .string()
    .min(2, 'O título deve ter no mínimo 2 caracteres')
    .max(64, 'O título não pode ter mais que 64 caracteres'),
  desc: z.string().max(200, 'A descrição só pode ter até 200 caracteres').optional(),
  isPrivate: z.boolean().optional(),
});

export type CreateCommunityFormValues = z.infer<typeof formSchema>;

export function CreateCommunity() {
  const { goBack, push } = useHistory();

  const { register, errors, formState, handleSubmit } = useForm<CreateCommunityFormValues>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  const { isValid } = formState;

  const client = useQueryClient();
  const { mutate: doCreate, isLoading } = useMutation(createCommunity, {
    onSuccess: (response) => handleSuccess(response.data.title),
    onError: (error: any) => handleError(error),
  });

  const handleSuccess = async (title: string) => {
    await client.invalidateQueries('communities');

    notify({ title: 'Sucesso!', body: `A comunidade ${title} foi criada com sucesso` });

    push('/feed');
  };

  const handleError = (error: AxiosError) => {
    const title = 'Erro';
    let message = 'Oops, algo deu errado! Por favor, tente novamente';
    if (error.response?.status === 409 || error.response?.status === 400) {
      const errorMesage = error.response.data.message;
      errorMesage && (message = errorMesage);
    }

    notify({ title, body: message });
  };

  const onSubmit = (values: CreateCommunityFormValues) => {
    if (isLoading) return;
    doCreate(values);
  };

  return (
    <form className="flex flex-col flex-1 p-6 md:py-16 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <header className="text-gray-800">
        <BackButton className="mb-4" onClick={goBack} />
        <h1 className="text-2xl font-black">Criar comunidade</h1>
      </header>
      <section className="space-y-4">
        <TextField ref={register} label="Título" name="title" error={errors.title} />
        <TextField
          ref={register}
          label="Código"
          helper="O código é o identificador da sua comunidade. Ele aparece na URL da sua comunidade e deve ser curto e único."
          name="code"
          error={errors.code}
        />
        <Textarea ref={register} rows={3} label="Descrição" name="desc" error={errors.desc} />
        <label className="flex items-center space-x-2">
          <Checkbox ref={register} name="isPrivate" />
          <p className="text-gray-800">Esta comunidade deve ser privada</p>
        </label>
      </section>
      <section className="flex flex-col w-full items-stretch md:items-end">
        <Button type="submit" color="primary" disabled={!isValid}>
          Criar
        </Button>
      </section>
    </form>
  );
}

import { reactive, ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, numeric } from '@vuelidate/validators';
import { computed, watchEffect } from 'vue-demi';

export function useForm() {
  const store = useStore();

  const formVisible = ref(false);

  const showForm = () => (formVisible.value = true);
  const hideForm = () => {
    formVisible.value = false;
    resetValues();
  };

  const form = reactive({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const resetValues = () => {
    form.id = '';
    form.firstName = '';
    form.lastName = '';
    form.email = '';
    form.phone = '';
    v$.value.$reset();
  };

  watchEffect(() => {
    form.phone = form.phone
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{3})(\d{3})(\d{2})(\d{2})/g, '($1) $2-$3$4')
      .substr(0, 14);
  });

  const rules = computed(() => ({
    id: { required, numeric },
    firstName: { required },
    lastName: { required },
    email: { email, required },
    phone: { required, minLength: minLength(14) },
  }));

  const v$ = useVuelidate(rules, form);

  function addUser() {
    v$.value.$touch();
    if (v$.value.$invalid) return;

    store.commit('addUser', {
      id: form.id + '',
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone + '',
    });

    hideForm();
    resetValues();
  }

  return {
    form,
    addUser,
    v$,
    formVisible,
    showForm,
    hideForm,
  };
}

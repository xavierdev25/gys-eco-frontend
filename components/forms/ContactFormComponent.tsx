"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Select from "../ui/Select";

interface ContactFormData {
  nombre: string;
  empresa: string;
  correo: string;
  producto: string;
  mensaje: string;
}

const productOptions = [
  { value: "", label: "Seleccionar producto" },
  { value: "vasos", label: "Vasos biodegradables" },
  { value: "platos", label: "Platos compostables" },
  { value: "cubiertos", label: "Cubiertos de bioplástico" },
  { value: "bolsas", label: "Bolsas biodegradables" },
  { value: "empaques", label: "Empaques compostables" },
  { value: "otro", label: "Otro" },
];

export default function ContactFormComponent() {
  const [formData, setFormData] = useState<ContactFormData>({
    nombre: "",
    empresa: "",
    correo: "",
    producto: "",
    mensaje: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Reemplazar con llamada real al backend
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      // Simulación de envío
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSuccess(true);
      setFormData({
        nombre: "",
        empresa: "",
        correo: "",
        producto: "",
        mensaje: "",
      });
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 md:p-10 rounded-xl border border-[#eaf0ee]">
      {!isSuccess ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              id="nombre"
              name="nombre"
              label="Nombre completo"
              placeholder="John Doe"
              type="text"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
            <Input
              id="empresa"
              name="empresa"
              label="Empresa"
              placeholder="Tu Empresa S.A.C."
              type="text"
              value={formData.empresa}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            id="correo"
            name="correo"
            label="Correo electrónico"
            placeholder="john.doe@empresa.com"
            type="email"
            value={formData.correo}
            onChange={handleChange}
            required
          />

          <Select
            id="producto"
            name="producto"
            label="Producto de interés"
            options={productOptions}
            value={formData.producto}
            onChange={handleChange}
            required
          />

          <Textarea
            id="mensaje"
            name="mensaje"
            label="Mensaje"
            placeholder="Cuéntanos más sobre tus necesidades..."
            rows={4}
            value={formData.mensaje}
            onChange={handleChange}
            required
          />

          <Button type="submit" fullWidth isLoading={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
          </Button>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center text-center gap-4 p-6 bg-[#1a4231]/10 rounded-lg border border-[#1a4231]/20 min-h-[400px]">
          <Image
            src="/icons/send.svg"
            alt="Mensaje enviado"
            width={50}
            height={50}
          />
          <p className="text-lg font-bold text-[#1a4231]">
            ¡Gracias por contactarnos!
          </p>
          <p className="text-sm text-[#5f8676]">
            Hemos recibido tu solicitud y te responderemos pronto.
          </p>
          <Button
            variant="outline"
            onClick={() => setIsSuccess(false)}
            className="mt-4"
          >
            Enviar otro mensaje
          </Button>
        </div>
      )}
    </div>
  );
}

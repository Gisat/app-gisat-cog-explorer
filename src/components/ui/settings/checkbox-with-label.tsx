import React, { useCallback } from 'react';
import { Checkbox, Loader, Text, Group } from '@mantine/core';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { createQueryString } from '@/utils/url';

type Variant = 'default' | 'destructive' | 'outline' | 'secondary';
type Size = 'sm' | 'md' | 'lg';

interface CheckboxWithLabelProps {
  label: string;
  name: string;
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  icon?: React.ReactNode;
  defaultValue?: boolean;
  children?: React.ReactNode;
}

const variantStyles = {
  default: { color: 'blue', borderColor: 'blue' },
  destructive: { color: 'red', borderColor: 'red' },
  outline: { color: 'gray', borderColor: 'gray' },
  secondary: { color: 'teal', borderColor: 'teal' },
};

const sizeStyles = {
  sm: { fontSize: '12px', padding: '4px' },
  md: { fontSize: '14px', padding: '8px' },
  lg: { fontSize: '16px', padding: '12px' },
};

const CheckboxWithLabel: React.FC<CheckboxWithLabelProps> = ({
  label,
  name,
  variant = 'default',
  size = 'md',
  isLoading = false,
  icon,
  defaultValue = false,
  children,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryStringCallback = useCallback(createQueryString, [searchParams]);
  const urlVal = searchParams.get(name) === 'true';

  const onChanged = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const checked = evt.target.checked;
    router.push(
      '?' + createQueryStringCallback(name, checked.toString(), Array.from(searchParams.entries())).toString(),
      { scroll: false }
    );
  };

  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  return (
    <label className="block mt-2">
      <Group align="center" style={{ ...sizeStyle, cursor: 'pointer' }}>
        {isLoading ? (
          <Loader size="sm" />
        ) : (
          <Checkbox
            checked={searchParams.has(name) ? urlVal : defaultValue}
            onChange={onChanged}
            styles={{
              input: {
                ...variantStyle,
              },
            }}
          />
        )}
        {icon && <span style={{ marginRight: '4px' }}>{icon}</span>}
        <Text style={{ color: variantStyle.color }}>{label}</Text>
      </Group>
      {children}
    </label>
  );
};

export default CheckboxWithLabel;
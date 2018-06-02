#ifndef __BASE_CLONEABLE_H_
#define __BASE_CLONEABLE_H_

#include <map>

namespace base{
	class Cloneable: public QObject
	{
	public:
		typedef std::map<std::string, QVariant> QVariantMap;

		explicit Cloneable(void);
		virtual ~Cloneable(void);
		
		bool empty() const;
		bool same(QSharedPointer<Cloneable> other);
		QSharedPointer<Cloneable> clone();
		void clear();

		QVariant& operator[](const std::string& key)
		{return _variants[key];}
		inline bool operator==(QSharedPointer<Cloneable> v) const
		{ return !v.isNull() && cmp(*(v.data())); }
		inline bool operator!=(const Cloneable& v) const
		{ return !cmp(v); }
		inline bool operator==(const Cloneable& v) const
		{ return cmp(v); }
		std::string toString();

	private:
		bool cmp(const Cloneable &other) const;

	private:
		QVariantMap _variants;
	};
}

#endif //__BASE_CLONEABLE_H_
